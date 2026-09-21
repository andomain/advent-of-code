#!/usr/bin/env bun
// Scaffold (and, when possible, fetch the input for) a year/day solution.
//
// Usage: bun run new <year> <day>
//
// Creates src/<year>/day<NN>/{index.ts,index.test.ts,sample.txt}, then tries
// to fetch and cache your personal input.txt for that day (skipped if it
// already exists, if AOC_SESSION_COOKIE isn't set, or if the puzzle hasn't
// unlocked yet). Safe to re-run: never overwrites index.ts/index.test.ts
// once they exist, and never re-fetches an input.txt that's already there.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AocClientError, fetchInput } from "./internal/aoc-client";
import { solutionTemplate, testTemplate } from "./internal/templates";

function parseArgs(argv: string[]): { year: number; day: number } {
  const [yearRaw, dayRaw] = argv;
  const year = Number(yearRaw);
  const day = Number(dayRaw);

  if (
    !yearRaw ||
    !dayRaw ||
    !Number.isInteger(year) ||
    !Number.isInteger(day)
  ) {
    console.error("Usage: bun run new <year> <day>");
    process.exit(1);
  }
  if (year < 2015) {
    console.error(`Invalid year ${year} — Advent of Code started in 2015.`);
    process.exit(1);
  }
  if (day < 1 || day > 25) {
    console.error(`Invalid day ${day} — must be between 1 and 25.`);
    process.exit(1);
  }
  return { year, day };
}

async function main() {
  const { year, day } = parseArgs(process.argv.slice(2));
  const padded = String(day).padStart(2, "0");
  const dir = join(import.meta.dir, "..", "src", String(year), `day${padded}`);

  mkdirSync(dir, { recursive: true });

  const indexPath = join(dir, "index.ts");
  const testPath = join(dir, "index.test.ts");
  const samplePath = join(dir, "sample.txt");
  const inputPath = join(dir, "input.txt");

  if (existsSync(indexPath)) {
    console.log(
      `src/${year}/day${padded}/index.ts already exists — leaving it alone.`,
    );
  } else {
    writeFileSync(indexPath, solutionTemplate(year, day));
    console.log(`Created src/${year}/day${padded}/index.ts`);
  }

  if (existsSync(testPath)) {
    console.log(
      `src/${year}/day${padded}/index.test.ts already exists — leaving it alone.`,
    );
  } else {
    writeFileSync(testPath, testTemplate(year, day));
    console.log(`Created src/${year}/day${padded}/index.test.ts`);
  }

  if (!existsSync(samplePath)) {
    writeFileSync(samplePath, "");
    console.log(
      `Created src/${year}/day${padded}/sample.txt (empty — paste in the worked example from the problem page).`,
    );
  }

  if (existsSync(inputPath)) {
    console.log(
      `src/${year}/day${padded}/input.txt already cached — not re-fetching.`,
    );
    return;
  }

  const sessionCookie = process.env.AOC_SESSION_COOKIE;
  if (!sessionCookie) {
    console.log(
      "AOC_SESSION_COOKIE not set — skipping input fetch. Copy .env.example to .env, " +
        "fill it in, then re-run this command to fetch and cache your input.",
    );
    return;
  }

  try {
    console.log(`Fetching input for ${year} day ${day}...`);
    const input = await fetchInput(year, day, sessionCookie);
    writeFileSync(inputPath, input);
    console.log(`Saved src/${year}/day${padded}/input.txt`);
  } catch (err) {
    if (err instanceof AocClientError) {
      console.error(err.message);
      process.exit(1);
    }
    throw err;
  }
}

await main();
