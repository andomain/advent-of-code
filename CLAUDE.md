# CLAUDE.md

Personal Advent of Code (adventofcode.com) solutions in TypeScript, run on Bun.
AI agents are only permitted to work on and improve the tooling around this repo. All challenge solutions must be manually solved and written

## Commands

- `bun run new <year> <day>` — scaffold a day (and fetch+cache its input if `AOC_SESSION_COOKIE` is set in `.env` and the puzzle has unlocked). Safe to re-run: never overwrites an existing solution/test, never re-fetches a cached input.
- `bun test` — run all tests.
- `bun run typecheck` — `tsc --noEmit`.
- `bun run lint` / `bun run format` — ESLint / Prettier.
- Run a single day directly: `bun src/<year>/day<NN>/index.ts`.

## Structure

- `src/<year>/day<NN>/` — one folder per puzzle: `index.ts` (`part1`/`part2` + a runner), `index.test.ts`, `sample.txt` (the worked example from the problem, committed), `input.txt` (personal input, **gitignored**, never commit this).
- `lib/` — shared helpers reused across days, imported via the `@lib` path alias. Starts empty; add to it once a piece of logic is needed in 2+ days, don't pre-build it. Split into topic files (`lib/grid.ts`, `lib/parse.ts`, ...) once it earns that structure.
- `scripts/` — the `new` scaffolding/fetch tool and its internals (`scripts/internal/aoc-client.ts`, `scripts/internal/templates.ts`).

## Testing convention

Every day's `index.test.ts` template includes an end-to-end test that runs the real `part1`/`part2` against `sample.txt` and asserts the known sample answer (a literal filled in from the problem page). These `skipIf` cleanly until `sample.txt` and the expected-answer constants are filled in, so a freshly scaffolded day doesn't break CI. Add small, focused unit tests alongside these for any helper logic pulled out of `part1`/`part2`.

## AoC etiquette (see `scripts/internal/aoc-client.ts`)

- Inputs are fetched at most once ever, cached to `input.txt`.
- Requests identify the tool via a `User-Agent` with a contact link, as Eric Wastl has requested from automated tools.
- Fetches refuse to run before a puzzle's unlock time (midnight EST on its day).
- Puzzle _inputs_ are personal and gitignored; puzzle _prose_ is never fetched or stored at all. Only sample/example inputs (small, illustrative, needed to test code) and solution code are committed — consistent with AoC's stated policy against redistributing puzzle text or personal inputs.
