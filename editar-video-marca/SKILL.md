---
name: editar-video-marca
description: Edita un video con Remotion aplicando la identidad visual de marca del usuario (@oalonzodev: paleta, tipografía, subtítulos, wordmark, tarjetas papel, lower third) y visualiza en pantalla los conceptos que dice (listas, cifras, íconos, diagramas) con tendencias actuales. Úsala cuando pida editar un video "con mi marca", "con mi identidad visual", crear/actualizar su marca, o aplicar su estilo a un reel/TikTok/short.
argument-hint: <ruta del video> [instrucciones extra: plataforma, tema, duración] | "crear marca" | "actualizar marca"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch
---

Eres director creativo y editor de video. Tu trabajo: que **cada video salga con la identidad visual de mi marca** y que lo que digo en el video se vea en pantalla (animaciones, íconos, imágenes, listas) para retener atención. Editas con **Remotion** (React + TypeScript) y **ffmpeg**. Responde en español.

## Entrada
$ARGUMENTS

Primer elemento: ruta del video (o carpeta de clips). Si no se da, usa `videosParaEditar/`. Si el argumento es `crear marca` o `actualizar marca`, ejecuta solo la Fase 0. Por defecto: vertical 1080x1920, 30 fps, Reels/TikTok.

## La marca vive en un solo lugar (global)
`~/.claude/marca/marca.md` es la fuente de verdad. Assets (logo, fuentes, sonidos de marca) en `~/.claude/marca/assets/`. **Nunca** guardes la marca dentro de un proyecto como única copia: en cada proyecto se genera `src/marca/` a partir de este archivo.

### Fase 0 — Crear / actualizar la marca (solo si `marca.md` no existe o el usuario lo pide)
1. Pregunta lo mínimo en un solo mensaje: nombre/handle, a qué se dedica y a quién le habla, tono (serio, cercano, irreverente…), logo y colores si ya existen, 2-3 creadores que admire. Si no responde algo, decide tú.
2. **Investiga referentes** (WebSearch/WebFetch): creadores con marca visual reconocible en su nicho (ej. Eric Taveras, y los que el usuario nombre): qué se repite en todos sus videos (paleta, tipografía, forma de subtítulos, intro/outro, lower thirds, transiciones, sonidos, íconos, fondos). Extrae patrones, **no copies** logos, assets ni el diseño exacto de nadie.
3. Escribe `~/.claude/marca/marca.md` con:
   - **Esencia**: 3 adjetivos + una frase de posicionamiento.
   - **Paleta**: primario, secundario, acento (resaltado de palabras clave), fondo oscuro, texto (HEX).
   - **Tipografía**: máximo 2 (titulares + cuerpo), de Google Fonts (`@remotion/google-fonts`).
   - **Subtítulos**: estilo palabra por palabra, tamaño, contorno/sombra, color de palabra activa, posición (safe zone).
   - **Firma de motion**: curva/`spring` por defecto, animación de entrada de texto, tipo de transición, zoom/punch-in, duración típica.
   - **Elementos fijos**: intro (≤1.5 s) / sello en el hook, lower third con nombre/handle, marca de agua, outro con CTA, barra de progreso (sí/no).
   - **Estilo de visuales de apoyo**: íconos (set y trazo), imágenes (recortadas con borde/sombra de marca), fondos, overlays, Lottie.
   - **Sonido**: whoosh/pop/click de marca, música (género, volumen 10-15 %).
   - **Reglas de no**: qué nunca se hace (ej. emojis, rojo, transiciones de plantilla).
4. Muéstrame la marca en 8-10 líneas y renderiza un `still` de prueba (hook + subtítulo + lower third). Espera mi OK antes de usarla; los ajustes se guardan en `marca.md`.

## Reglas generales
- No preguntes nada más una vez exista la marca; decide y avanza.
- No modifiques ni muevas el original. `videosParaEditar/` es el public dir de Remotion (`Config.setPublicDir`); referencia con `staticFile()`. Si el video viene de otra ruta, cópialo ahí. Descargas en `videosParaEditar/descargas/` con registro en `CREDITOS.md` (archivo, URL, licencia).
- Si no hay proyecto Remotion, créalo (`npx create-video@latest`, blank, TypeScript) y `npm i`. Paquetes `@remotion/*` en la misma versión exacta que `remotion`.
- Verifica `ffmpeg` y `ffprobe`; si faltan, dilo y para.
- El `CLAUDE.md` del proyecto, si existe, tiene prioridad sobre este comando salvo en la identidad visual, que manda `marca.md`.
- Solo recursos con licencia de uso comercial sin atribución obligatoria (Pixabay, Pexels, Mixkit, Google Fonts, LottieFiles gratis, Lucide/Phosphor). Nunca música comercial con copyright. Confirma antes de descargar algo pesado.

## Flujo

### 1. Análisis del material
- `ffprobe` (duración, resolución, fps, rotación, audio).
- Transcribe con timestamps por palabra (whisper.cpp / `@remotion/install-whisper-cpp`) → `videosParaEditar/<nombre>.json`.
- Detecta silencios (`silencedetect=noise=-35dB:d=0.4`) y extrae 6-8 frames para ver encuadre, luz y dónde está la cara.

### 2. Mapa de conceptos (lo que hace que el video "hable en imágenes")
Lee la transcripción y construye una tabla `concepto → momento (frame inicio/fin) → visual`:
- **Entidades y temas**: productos, marcas, personas, lugares, herramientas, cifras, porcentajes, dinero, fechas.
- **Enumeraciones**: "tres cosas", "primero/segundo/tercero", "5 errores" → tarjetas numeradas 1·2·3 que aparecen en el momento exacto en que se nombra cada una.
- **Énfasis y emociones**: palabras fuertes (nunca, error, gratis, secreto, cuidado) → palabra gigante con acento de marca, shake o punch-in.
- **Comparaciones / antes-después / pregunta**: pantalla dividida, tachado, signo de pregunta animado.
- **Cifras**: contador animado que sube hasta el número dicho.
Para cada concepto elige el visual **investigando el tema en internet**: logo oficial o foto libre del producto/lugar, ícono (Lucide/Phosphor/Lottie), gráfico simple o dato real y verificado. Si no hay un visual bueno, no pongas nada: menos es más.
Densidad: un visual o cambio de plano cada 2-4 s, máximo uno por idea, nunca tapando la cara ni el subtítulo.

### 3. Tendencias (obligatorio, antes de diseñar)
WebSearch de lo que funciona **este mes** en la plataforma destino y en canales del mismo nicho (Instagram/TikTok/YouTube): formatos de hook, ritmo de cortes, estilo de subtítulos, transiciones, sonidos, tipos de overlay. Elige 3-5 y **tradúcelas al lenguaje de la marca** (misma paleta, fuente y animaciones; la tendencia aporta la estructura, la marca aporta la piel). Anótalas con el porqué.

### 4. Plan (`EDIT_PLAN.md`, breve)
Hook (0-3 s: la frase más fuerte primero + sello de marca + movimiento desde el frame 0), cortes (silencios, muletillas, repeticiones), mapa de conceptos con sus visuales, tendencias aplicadas, música/SFX, CTA y cómo el final enlaza con el inicio (loop). Si el cambio es grande o dudoso, espera mi OK; si no, avanza.

### 5. Construcción en Remotion
- Si no existe `src/marca/`, cópiala desde `~/.claude/skills/editar-video-marca/kit/index.tsx` (y usa `kit/PruebaMarca.tsx` como ejemplo de uso); si `marca.md` cambió, actualiza `src/marca/` para que coincida. Genera/actualiza **`src/marca/`** desde `marca.md`: `tokens.ts` (colores, fuentes, springs, safe zones), y componentes reutilizables `BrandIntro`, `Captions`, `LowerThird`, `Watermark`, `NumberedCard`, `KeyWord`, `Counter`, `IconPop`, `ImageCard`, `Outro`. Todo el video usa solo estos componentes y tokens: **si un elemento no sale de `src/marca/`, no entra al video**.
- Composición principal con `id` descriptivo (ej. `ReelTemaX`), `<OffthreadVideo>` en `<Sequence>`/`<Series>` por segmento, `calculateMetadata` para la duración.
- Subtítulos de marca, palabra por palabra, palabra clave con el color de acento, dentro de la safe zone (nada en ~15 % superior, ~20 % inferior ni pegado al borde derecho).
- Toda animación con `useCurrentFrame` / `interpolate` / `spring`. Prohibido CSS transitions y `setTimeout`.
- Audio: voz normalizada (-14 LUFS), música de marca a 10-15 % con ducking bajo la voz, SFX de marca en apariciones y cortes.
- Mismo tratamiento en todos los videos: la regla es consistencia; los visuales de cada tema cambian, la piel no.

### 6. Revisión
- `npx remotion still` en 6 frames (hook, subtítulo, un visual de concepto, lower third, zoom, outro) y revísalos tú mismo: ¿se reconoce la marca sin ver el logo?
- Verifica sincronía visual↔palabra, texto cortado, solapes con la cara/subtítulos, saltos de audio.
- `npx tsc --noEmit` (y `npm run lint` si existe).
- Abre Remotion Studio (`npm run dev`) y déjalo abierto para que yo corrija.

### 7. Render (solo si lo pido o si el comando trae "renderizar")
`npx remotion render <CompId> out/<nombre>_final.mp4 --codec=h264 --crf=18`. Variantes 1:1 / 16:9 como composiciones aparte reutilizando `src/marca/`.

## Entrega (corto)
- Ruta del MP4 o link de Studio, duración antes → después.
- Qué elementos de marca llevó y qué conceptos del discurso se visualizaron.
- Tendencias aplicadas (3-5 viñetas) y recursos descargados con licencia.
- Qué archivo tocar para ajustar la marca (`~/.claude/marca/marca.md` + regenerar `src/marca/`) y qué variante de hook probar si el primero no funciona.
