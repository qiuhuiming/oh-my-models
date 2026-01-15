import { writeFileSync, copyFileSync, existsSync } from "fs";
import { join } from "path";
import { loadConfig } from "./loader";
import { OhMyModelsConfigSchema } from "./schema";
import type { OhMyModelsConfig, UpdateOptions, SaveResult } from "../types";

export function saveConfig(
  updates: Partial<OhMyModelsConfig>,
  options: UpdateOptions = {}
): SaveResult {
  const { dryRun = false, backup = true, configPath } = options;
  const targetPath = configPath || join(process.env.HOME!, ".config/opencode/oh-my-opencode.json");

  if (!existsSync(targetPath)) {
    return {
      success: false,
      path: targetPath,
      error: "Config file does not exist"
    };
  }
  const existing = loadConfig(configPath);

  const mergedConfig = deepMerge(existing as Record<string, unknown>, updates as Record<string, unknown>);

  const validation = OhMyModelsConfigSchema.safeParse(mergedConfig);
  if (!validation.success) {
    return {
      success: false,
      path: targetPath,
      error: "Invalid config: " + validation.error.errors.map((e) => e.message).join(", ")
    };
  }

  if (dryRun) {
    console.log("[DRY RUN] Would save to:", targetPath);
    console.log("[DRY RUN] Content:");
    console.log(JSON.stringify(mergedConfig, null, 2));
    return {
      success: true,
      path: targetPath,
      error: undefined
    };
  }

  let backupPath: string | undefined;

  if (backup) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    backupPath = `${targetPath}.backup.${timestamp}`;
    try {
      copyFileSync(targetPath, backupPath);
      console.log(`Backup created: ${backupPath}`);
    } catch (err) {
      console.warn("Failed to create backup:", err);
    }
  }

  try {
    writeFileSync(targetPath, JSON.stringify(mergedConfig, null, 2), "utf-8");
    console.log(`Config saved: ${targetPath}`);
    return {
      success: true,
      path: targetPath,
      backupPath
    };
  } catch (err) {
    return {
      success: false,
      path: targetPath,
      backupPath,
      error: `Failed to save: ${err instanceof Error ? err.message : String(err)}`
    };
  }
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      sourceValue !== null &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue !== null &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      );
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue;
    }
  }

  return result;
}
