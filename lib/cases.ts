import fs from "node:fs";
import path from "node:path";
import type { CourtroomCase } from "@/types/case";

const CASES_DIR = path.join(process.cwd(), "content", "cases");

let cached: CourtroomCase[] | null = null;

function loadAll(): CourtroomCase[] {
  if (cached) return cached;
  const files = fs
    .readdirSync(CASES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  const list = files.map((file) => {
    const raw = fs.readFileSync(path.join(CASES_DIR, file), "utf8");
    return JSON.parse(raw) as CourtroomCase;
  });
  cached = list;
  return list;
}

export function getAllCases(): CourtroomCase[] {
  return loadAll();
}

export function getCaseBySlug(slug: string): CourtroomCase | undefined {
  return loadAll().find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return loadAll().map((c) => c.slug);
}
