import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { parse as parseJsonc } from "jsonc-parser";
import { OhMyModelsConfigSchema, type OhMyModelsConfigSchemaType } from "./schema";
import type { OhMyModelsConfig } from "../types";

const CONFIG_DIR = ".config/opencode";
const CONFIG_FILE = "oh-my-opencode.json";

let cachedConfig: OhMyModelsConfig | null = null;

export function getConfigPath(customPath?: string): string {
  if (customPath) {
    return customPath;
  }
  return join(homedir(), CONFIG_DIR, CONFIG_FILE);
}

export function configExists(customPath?: string): boolean {
  return existsSync(getConfigPath(customPath));
}

export function loadConfig(customPath?: string): OhMyModelsConfig {
  if (cachedConfig && !customPath) {
    return cachedConfig;
  }

  const configPath = getConfigPath(customPath);

  if (!existsSync(configPath)) {
    cachedConfig = {};
    return {};
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    const rawConfig = parseJsonc(content);
    const result = OhMyModelsConfigSchema.safeParse(rawConfig);

    if (!result.success) {
      console.error("Config validation errors:");
      result.error.errors.forEach((err) => {
        console.error(`  ${err.path.join(".")}: ${err.message}`);
      });
      cachedConfig = {};
      return {};
    }

    cachedConfig = result.data;
    return result.data;
  } catch (err) {
    console.error(`Failed to load config from ${configPath}:`, err);
    cachedConfig = {};
    return {};
  }
}

export function clearCache(): void {
  cachedConfig = null;
}
