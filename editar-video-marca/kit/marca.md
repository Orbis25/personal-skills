# Marca: oalonzodev (v1 — APROBADA por el usuario el 2026-10-28)

Solo marca personal dev. Papp NO forma parte de esta identidad (ni logo, ni colores, ni variante).

## Esencia
- **3 adjetivos:** claro, directo, técnico-cercano.
- **Posicionamiento:** "Dominando el código para que tú no sufras" — arquitectura y backend explicados con diagramas, de Junior a Senior.
- **Audiencia:** devs hispanohablantes junior/mid que quieren pensar como senior. Español dominicano/neutro, sin jerga rebuscada.

## Paleta (HEX)
| Rol | Color | Uso |
|---|---|---|
| Fondo | `#0A0E14` | Fondo base (terminal midnight) |
| Superficie | `#121A24` | Tarjetas, barras, lower third |
| Texto | `#F2F5F7` | Subtítulos y titulares |
| Primario | `#22D3EE` | Cursor `_`, líneas, íconos, palabra activa |
| Resaltado | `#FBBF24` | Palabra clave del subtítulo, cifras |
| Alerta | `#FF5D5D` | Anti-patrones, errores, "nunca" |
| Éxito | `#34D399` | Buenas prácticas, resultado correcto |
| Papel | `#F4EFE6` | Tarjetas de ilustración tipo tinta (tu estilo de diagramas) |

## Tipografía (máx. 2, `@remotion/google-fonts`)
- **Space Grotesk** (700): titulares, números, palabra gigante.
- **JetBrains Mono** (500/700): subtítulos tipo código, chips, handle, snippets.

## Elemento firma
**El "papel sobre terminal":** los conceptos de arquitectura se explican con ilustraciones/diagramas estilo dibujo a tinta sobre una tarjeta color Papel con sombra suave, que aparece encima del fondo oscuro. Es lo que ya funciona en tus videos (load balancer, escalado) hecho sistemático: 1 concepto = 1 tarjeta papel.
- Wordmark: `oalonzo.dev_` en JetBrains Mono, el `_` parpadea (cursor). Sin logo externo.

## Subtítulos
- JetBrains Mono 700, ~64 px, mayúsculas solo en la palabra clave.
- 2-4 palabras por línea, palabra por palabra; la activa en Primario, la palabra clave de la frase en Resaltado.
- Contorno 6 px `#0A0E14` + sombra suave. Posición: tercio inferior, centro a ~ y=1330 de 1920 (dentro de la safe zone), sin tapar la cara.

## Firma de motion
- `spring` por defecto: `{ damping: 200 }` para entradas suaves; `{ damping: 14, stiffness: 180 }` para "pop" de palabra gigante.
- Entrada de texto: sube 24 px + fade, 8-10 frames. Salida: fade 6 frames.
- Tarjetas papel: entran con leve rotación (−2° → 0°) y escala 0.92 → 1.
- Punch-in 1.0 → 1.08 en frases clave; transiciones: jump cut limpio, slide corto de 8-10 frames solo entre bloques.
- Cifras: contador que sube hasta el número dicho.

## Elementos fijos
- **Hook (0-3 s):** pregunta o dolor real en texto grande (Space Grotesk 700) + sello `oalonzo.dev_` pequeño arriba-izquierda (dentro de safe zone). Movimiento desde el frame 0.
- **Lower third:** al ~3-4 s, 2.5 s: "Alonzo · Software Engineer" en chip Superficie con borde Primario, abajo-izquierda, sobre la zona del subtítulo sin tocarla.
- **Marca de agua:** el wordmark `oalonzo.dev_` arriba-izquierda (y≈290, dentro de safe zone) en todo el video; 100 % en el hook, 70 % después, con sombra suave (al 45 % no se leía sobre paredes claras). No poner marca de agua abajo (zona de UI de la app).
- **Enumeraciones:** "tres cosas" → 3 tarjetas numeradas `01 02 03` (número en Resaltado, mono) que aparecen en el instante en que se nombra cada una.
- **Outro (≥2 s):** "Escribe **PALABRA** y te lo explico" + `@oalonzodev`, y el final enlaza con el inicio (misma frase/visual del hook).
- Barra de progreso: no.

## Visuales de apoyo
- Diagramas/ilustraciones: tinta sobre Papel (generados o recreados en SVG con líneas negras y trazo irregular suave).
- Íconos: Lucide, trazo 2 px, color Primario. Logos de tecnologías (RabbitMQ, .NET, PostgreSQL…) sobre chip Superficie.
- Código: bloque Superficie con borde Primario, JetBrains Mono, escrito letra a letra en el momento en que se nombra; líneas importantes resaltadas en Resaltado.
- Anti-patrón vs buena práctica: dos tarjetas, Alerta ✗ / Éxito ✓.

## Sonido
- SFX de marca: pop suave al aparecer una tarjeta, whoosh corto en slides, click mecánico al escribir código. Un mismo set en todos los videos.
- Música: lo-fi / tech beat instrumental, 10-15 % con ducking bajo la voz. Solo con licencia comercial libre.

## Reglas de no
- Nada de Papp en la marca. Nada de emojis en pantalla. Sin rojo/naranja como color de marca (rojo solo = alerta). Sin plantillas de transición de CapCut. Sin más de 1 visual de apoyo a la vez. Nada fuera de `src/marca/`.

## Referentes y notas de investigación (2026-10)
- La búsqueda web no devolvió información específica de Eric Taveras; los patrones salen de tendencias generales 2026 y de tu propio contenido, no de copiar a nadie. Revisar su perfil a mano y ajustar si quieres acercarte a su estilo.
- Tendencias 2026 (fuentes de marketing, orientativas): subtítulos animados palabra por palabra; hooks de curiosidad/dolor en 2-3 s; en tech funcionan composiciones limpias y énfasis en pocas palabras, no efectos recargados; demos visuales; cortes ágiles sin silencios; consistencia de marca en Reels.
