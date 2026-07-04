---
name: dotnet-clean-architecture
description: >-
  Personal conventions for building .NET / ASP.NET Core backend services the way
  I build them: Clean Architecture in 4 layers, the FoundationKit library
  (BaseRepository / BaseService / BaseResponse), event-driven microservices over
  RabbitMQ, HybridCache, and FluentValidation. Use this skill WHENEVER working on
  a .NET/C# backend in this style — creating or editing controllers, services,
  repositories, DTOs, validators, DbContext, EF Core entities, event handlers,
  caching, or DI wiring. Also trigger it whenever the user mentions FoundationKit,
  BaseService, BaseMapService, BaseRepository, BaseResponse/Result, an event
  handler, or asks to "scaffold a CRUD endpoint", "add an entity", "wire up
  messaging", "follow my conventions", or "my style". Apply proactively even when
  the user doesn't name the skill explicitly — if the file is a .cs backend file
  in a layered solution, these conventions apply.
---

# .NET Clean Architecture conventions

This is how I build backend services. Follow these conventions so the code I get
back reads like the code I already have — same layering, same base classes, same
response shapes, same naming. When something here conflicts with a project's own
`CLAUDE.md`, the project wins; otherwise this is the default.

## Mindset: laziest solution that actually works

Before writing anything, run the ladder and stop at the first rung that holds:

1. **Does this need to exist at all?** Speculative need → skip it, say so in one line. (YAGNI)
2. **Does the stdlib / ASP.NET Core / EF Core cover it natively?** Use it.
3. **Does an already-referenced NuGet (FoundationKit, AutoMapper, FluentValidation, Refit, Polly) solve it?** Use it — never add a dependency for what a few lines do.
4. **Can it be one line?** One line.
5. **Only then:** the minimum code that works.

Shortest working diff wins. No abstraction without a second implementation already
in sight — no interface with one impl, no factory for one product, no config for a
value that never changes. Mark deliberate shortcuts with a comment naming the
ceiling and the upgrade path, e.g. `// ponytail: best-effort publish; transactional outbox if delivery must be guaranteed`.

The one place *not* to be lazy: input validation at trust boundaries, error handling
that prevents data loss, security, and auth. Those get the full treatment.

## Architecture: 4 layers, strict inward dependencies

Every service is a vertical split into four projects. Dependencies point inward only
(API → Infrastructure → Application → Domain). Never let an inner layer reference an
outer one.

| Layer | Owns | Depends on |
|---|---|---|
| `*.Domain` | Entities, enums, value objects, domain options. **Zero dependencies.** | nothing |
| `*.Application` | Services, DTOs, validators, AutoMapper profiles, Refit contracts, event messages + handlers, cache-key constants | Domain |
| `*.Infrastructure` | EF Core (DbContext, configurations, repositories, migrations), middleware, seeds, DI wiring | Application |
| `*.API` | Thin controllers — translate service results to HTTP, nothing else | Infrastructure |

## Base classes (FoundationKit)

FoundationKit is my shared library ([github.com/Orbis25/FoundationKit](https://github.com/Orbis25/FoundationKit)).
Lean on it instead of hand-rolling CRUD plumbing.

### Repositories

Concrete repos extend `BaseRepository<ApplicationDbContext, TEntity>`. Interfaces live
in `*.Application/EF/Repositories/` (or `Repositories/EF/`), custom methods on the
concrete class. Use `ProjectTo<TResponse>` on `IQueryable` for SQL-level projection —
**never load full entities just to map them.**

```csharp
public class ProductRepository(ApplicationDbContext context)
    : BaseRepository<ApplicationDbContext, Product>(context), IProductRepository
{
    public Task<PaginationResult<Product>> PaginateProductAsync(FilterProductInput filter,
        CancellationToken cancellationToken = default) => /* custom query */;
}
```

### Services

Pick by whether the API shape differs from the entity:

- **`BaseService<TModel, TRepository>`** — entity-level CRUD, no mapping.
- **`BaseMapService<TEntity, TInput, TResponse, TEdit, TRepository>`** — mapped CRUD, delegates to an `IMapRepository` that projects. Use this for most endpoints where the API shape ≠ entity.

Both expose `CreateAsync` / `UpdateAsync` / `DeleteAsync` (soft) / `GetByIdAsync` /
`GetPaginatedListAsync` / `ExistAsync`. Inject repos via constructor. Fields are
`private readonly _camelCase`. When there's real business logic (uniqueness checks,
cross-entity rules, event publishing), write a bespoke service instead of extending
the base — the base is for the plain cases.

## Response conventions

Every service method returns one of these — never a bare entity, never `null`:

| Type | When |
|---|---|
| `Result` / `BaseResponse` | Void operations (delete, update with no payload) |
| `Result<T>` / `BaseResponse<T>` | Operations that return data |
| `PaginationResult<T>` | Paginated lists |
| `bool` | Simple exist/delete from the base layer |

- Success is computed from the absence of errors, not set manually.
- For a missing required entity, return the NotFound variant (`Result<T>.NotFound("...")` / set `NotFound = true`) — **don't return `null`**.
- Error entries carry a machine code + a user message:

```csharp
new ErrorMessage { Code = "product.name_exists", Message = "Ya existe un producto con ese nombre" }
```

## Controllers

Thin. They translate a service result to an HTTP status and nothing more — no business
logic, no try/catch (a global exception handler produces the error response).

- One controller per aggregate root, in `*.API/Controllers/{Feature}/`.
- Explicit kebab-case-plural route: `[Route("api/products")]` — never the `[controller]` token.
- Class-level auth uses the **named** scheme property:
  `[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]`.
  Never the positional string ctor `[Authorize(JwtBearerDefaults.AuthenticationScheme)]` —
  that binds to `Policy`, not the scheme, and throws `AuthorizationPolicy named 'Bearer' was not found` at request time.
- Role-gate sensitive actions: `[Authorize(Roles = nameof(AuthLevel.Admin))]`.
- `///` XML doc + `[ProducesResponseType<T>(StatusCodes.StatusXXX)]` on every action.
- Inject exactly one service.

```csharp
[HttpGet]
[ProducesResponseType<PaginationResult<ProductResponse>>(StatusCodes.Status200OK)]
public async Task<IActionResult> GetPaginated([FromQuery] FilterProductInput filter,
    CancellationToken cancellationToken = default)
    => Ok(await _service.GetPaginatedAsync(filter, cancellationToken));
```

Translation rules: `IsNotFound` → `NotFound(result)`; `!IsSuccess` → `BadRequest(result)`;
success → `Ok(result)` / `NoContent()` / `StatusCode(201, result)`.

## DTOs

| Suffix | Purpose |
|---|---|
| `{Entity}Input` | Create payload |
| `{Entity}Update` / `{Entity}Edit` | Update payload |
| `{Entity}Response` | Output / read model (records; use `with` for currency-adjusted copies) |
| `Filter{Entity}Input` | Paginated query — extends `Paginate`/`PaginationCore`, bound with `[FromQuery]` |

## Validators (FluentValidation)

One `AbstractValidator<TInput>` per input DTO, in `*.Application/Validators/{Feature}/`.
**Error messages in Spanish** (user-facing). Auto-wired via `AddValidatorsFromAssembly`
+ the auto-validation MVC integration — so no manual validation `if`s in services or
controllers.

```csharp
public class ProductInputValidator : AbstractValidator<ProductInput>
{
    public ProductInputValidator()
        => RuleFor(x => x.Name).NotEmpty().WithMessage("Nombre es requerido");
}
```

## AutoMapper

Profiles in `*.Application/Mappers/` (or `Mappings/Profiles/`). Project with
`ProjectTo<TResponse>` on `IQueryable` so it runs in SQL — never `.ToList()` then `.Map()`.

## Events (RabbitMQ)

Products and Inventory talk only through events — no direct REST between business
services. Every event must be idempotent.

- Publish via `IRabbitMessageBroker.PublishAsync(event, cancellationToken)`.
- Handlers implement `IMessageHandler<TEvent>` in `*.Application/Events/Handlers/{Feature}/`, registered as subscribers in `AddInfrastructure()`.
- Event names: `{Action}Event` (e.g. `ProductCreatedEvent`, `StockAdjustedEvent`). Handlers: `{Action}EventHandler`.
- **Idempotency (inbox pattern):** each message carries a stable `MessageId` (GUID) across retries. Before applying an effect, check a `ProcessedEvents` table for that id — if present, ack and no-op; otherwise apply the effect and insert the id in the same transaction.
- Publishing is best-effort: if the broker is down, log and let the HTTP operation still succeed (the data already persisted). Mark it with a `// ponytail:` note pointing at the transactional-outbox upgrade.

## Caching

`HybridCache` (L1 in-memory + L2 Redis) on hot-path reads: product lists / by-category,
price + FX conversion, stock. Cache keys are `static class CacheKey` constants with a
trailing `_` (e.g. `"Products_"`, `"Stock_"`). Invalidate explicitly on every mutation —
`RemoveByTagAsync` for lists, `RemoveAsync` for single keys — wrapped so a cache failure
never fails the operation.

## Naming

| Thing | Pattern |
|---|---|
| Controller | `{Feature}Controller` |
| Service | `I{Entity}Service` / `{Entity}Service` |
| Repository | `I{Entity}Repository` / `{Entity}Repository` |
| Create / Update / Response / Filter DTO | `{Entity}Input` / `{Entity}Update` / `{Entity}Response` / `Filter{Entity}Input` |
| Validator | `{Entity}InputValidator` |
| Event / Handler | `{Action}Event` / `{Action}EventHandler` |
| Private fields | `_camelCase` |

## Language

- **Code** (identifiers, comments, logs): English.
- **User-facing strings** (validation messages, error `Message`): Spanish.

## Code style

- C# 12+: collection expressions `[...]`, target-typed `new()`, primary constructors on services/handlers/repos.
- `CancellationToken cancellationToken = default` on every public async method — and flow it through.
- Constructor injection only. No property injection, no service locator.
- Expression bodies (`=>`) for single-call methods.
- Soft delete everywhere — `SoftRemoveAsync`, never a hard delete.
- No manual `CreatedAt` / `UpdatedAt` — the DbContext stamps them.
- Global usings for framework/common namespaces; file-level `using` only for the rest.
- Leave one runnable check behind for non-trivial logic (a branch, a loop, a money/security path) — the smallest xUnit test that fails if the logic breaks. Trivial one-liners need none.
