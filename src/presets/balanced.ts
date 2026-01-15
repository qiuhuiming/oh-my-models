import type { OhMyModelsConfig } from "../types";

export const BALANCED_PRESET: Record<string, { model: string }> = {
  sisyphus: { model: "anthropic/claude-3" },
  oracle: { model: "openai/gpt-5.2" },
  librarian: { model: "opencode/glm-4.7-free" },
  explore: { model: "opencode/grok-code" },
  "frontend-ui-ux-engineer": { model: "google/gemini-3-flash" },
  "document-writer": { model: "google/gemini-3-flash" },
  "multimodal-looker": { model: "google/gemini-3-flash" },
  prometheus: { model: "anthropic/claude-opus-4.5" },
  metis: { model: "anthropic/claude-3" },
  momus: { model: "openai/gpt-5.2" },
  "orchestrator-sisyphus": { model: "anthropic/claude-3" }
};
