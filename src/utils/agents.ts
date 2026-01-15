import type { AgentName } from "../types";

const AGENTS: Record<AgentName, { description: string; defaultModel?: string }> = {
  sisyphus: {
    description: "Master orchestrator",
    defaultModel: "anthropic/claude-opus-4.5"
  },
  oracle: {
    description: "Strategic advisor",
    defaultModel: "openai/gpt-5.2"
  },
  librarian: {
    description: "Multi-repo analyst",
    defaultModel: "opencode/glm-4.7-free"
  },
  explore: {
    description: "Fast code explorer",
    defaultModel: "opencode/grok-code"
  },
  "frontend-ui-ux-engineer": {
    description: "UI/UX generator",
    defaultModel: "google/gemini-3-pro-preview"
  },
  "document-writer": {
    description: "Technical writer",
    defaultModel: "google/gemini-3-flash"
  },
  "multimodal-looker": {
    description: "PDF/image analyzer",
    defaultModel: "google/gemini-3-flash"
  },
  prometheus: {
    description: "Strategic planner",
    defaultModel: "anthropic/claude-opus-4.5"
  },
  metis: {
    description: "Plan consultant",
    defaultModel: "anthropic/claude-sonnet-4.5"
  },
  momus: {
    description: "Plan reviewer",
    defaultModel: "openai/gpt-5.2"
  },
  "orchestrator-sisyphus": {
    description: "Primary orchestrator",
    defaultModel: "anthropic/claude-opus-4.5"
  }
};

export function getAgentList(): AgentName[] {
  return Object.keys(AGENTS) as AgentName[];
}

export function getAgentInfo(name: string): typeof AGENTS[AgentName] | undefined {
  return AGENTS[name as AgentName];
}

export function getAgentDescription(name: AgentName): string {
  return AGENTS[name]?.description || name;
}

export function getDefaultModel(name: AgentName): string | undefined {
  return AGENTS[name]?.defaultModel;
}
