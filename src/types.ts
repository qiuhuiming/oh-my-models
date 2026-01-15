export type AgentName =
  | "sisyphus"
  | "oracle"
  | "librarian"
  | "explore"
  | "frontend-ui-ux-engineer"
  | "document-writer"
  | "multimodal-looker"
  | "prometheus"
  | "metis"
  | "momus"
  | "orchestrator-sisyphus";

export interface AgentConfig {
  model?: string;
  temperature?: number;
  variant?: string;
  prompt_append?: string;
}

export interface OhMyModelsConfig {
  agents?: Partial<Record<AgentName, AgentConfig>>;
  disabled_agents?: string[];
  disabled_hooks?: string[];
  disabled_mcps?: string[];
  disabled_skills?: string[];
  disabled_commands?: string[];
}

export interface ValidationResult {
  agent: string;
  model: string;
  valid: boolean;
  error?: string;
}

export interface UpdateOptions {
  dryRun?: boolean;
  backup?: boolean;
  configPath?: string;
}

export interface SaveResult {
  success: boolean;
  path: string;
  backupPath?: string;
  error?: string;
}

export interface AgentRow {
  agent: string;
  model: string;
  description: string;
}

export type CommandName =
  | "list"
  | "update"
  | "validate"
  | "preset"
  | "interactive";
