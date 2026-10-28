// Uso: node scripts/transcribe.mjs videosParaEditar/clip.MOV [...más clips]
// Escribe videosParaEditar/<nombre>.json (Caption[] de @remotion/captions, tiempos relativos al clip).
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  WHISPER_WEBGPU_SAMPLE_RATE,
  canUseWhisperWebGpu,
  downloadWhisperModel,
  loadWhisperModel,
  toCaptions,
  transcribe,
} from "@remotion/whisper-webgpu";

const model = "large-v3-turbo"; // ponytail: el mejor multilingüe disponible; "small" si importa la velocidad

const support = await canUseWhisperWebGpu();
if (!support.supported) throw new Error(support.detailedReason);

await downloadWhisperModel({ model });
await loadWhisperModel({ model });

for (const file of process.argv.slice(2)) {
  // ffmpeg decodifica HEVC/MOV mejor que cualquier lib JS: PCM f32 mono 16 kHz
  const pcm = execFileSync(
    "ffmpeg",
    ["-v", "error", "-i", file, "-vn", "-ac", "1", "-ar", String(WHISPER_WEBGPU_SAMPLE_RATE), "-f", "f32le", "-"],
    { maxBuffer: 1024 * 1024 * 1024 },
  );
  const channelWaveform = new Float32Array(pcm.buffer, pcm.byteOffset, pcm.byteLength / 4);
  const transcription = await transcribe({ channelWaveform, model, language: "es" });
  const { captions } = toCaptions({ whisperWebGpuOutput: transcription });
  const out = path.join("videosParaEditar", path.parse(file).name + ".json");
  await writeFile(out, JSON.stringify(captions, null, 2));
  console.log(`${out}: ${captions.length} palabras`);
}
