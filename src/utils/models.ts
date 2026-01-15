export const PROVIDERS = ["anthropic", "openai", "google", "opencode", "github-copilot"] as const;

export interface ModelParseResult {
  provider: string;
  name: string;
}

export interface ValidateResult {
  valid: boolean;
  error?: string;
}

export function validateModel(model: string): ValidateResult {
  if (!model || typeof model !== "string") {
    return { valid: false, error: "Model must be a non-empty string" };
  }

  const parts = model.split("/");
  if (parts.length !== 2) {
    return { valid: false, error: "Model must be in format 'provider/model-name'" };
  }

  const [provider, name] = parts;
  if (!PROVIDERS.includes(provider as any)) {
    return {
      valid: false,
      error: `Unknown provider '${provider}'. Valid providers: ${PROVIDERS.join(", ")}`
    };
  }

  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Model name cannot be empty" };
  }

  return { valid: true };
}

export function parseModel(model: string): ModelParseResult | null {
  const parts = model.split("/");
  if (parts.length !== 2) {
    return null;
  }

  const [provider, name] = parts;
  return { provider, name };
}

export function getKnownProviders(): readonly string[] {
  return PROVIDERS;
}
