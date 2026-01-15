export class ConfigError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "ConfigError";
    this.code = code;
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AgentNotFoundError extends Error {
  constructor(agentName: string) {
    super(`Agent not found: ${agentName}`);
    this.name = "AgentNotFoundError";
  }
}

export class InvalidModelError extends Error {
  constructor(model: string, details: string) {
    super(`Invalid model: ${model}. ${details}`);
    this.name = "InvalidModelError";
  }
}
