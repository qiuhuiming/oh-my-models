import { z } from "zod";
import type { AgentConfig } from "../types";

const AgentConfigSchema = z.object({
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  variant: z.string().optional(),
  prompt_append: z.string().optional()
});

export const OhMyModelsConfigSchema = z.object({
  agents: z.record(AgentConfigSchema).optional(),
  disabled_agents: z.array(z.string()).optional()
});

export type OhMyModelsConfigSchemaType = z.infer<typeof OhMyModelsConfigSchema>;
