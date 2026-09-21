# Advent of Code

My solutions to [Advent of Code](https://adventofcode.com), in TypeScript on [Bun](https://bun.sh).

## Setup

```sh
bun install
cp .env.example .env
```

Then fill in `.env` with your AoC session cookie:

1. Log in at [adventofcode.com](https://adventofcode.com) (GitHub login works fine — AoC only uses it to verify your identity in the browser; there's no API token, so this cookie is the only credential automation can use).
2. Open devtools → Application/Storage → Cookies → `adventofcode.com` → copy the value of the cookie named `session`.
3. Paste it into `.env` as `AOC_SESSION_COOKIE=...`.

This value is a bearer credential for your account — treat it like a password. It's gitignored and should never be committed.

## Usage

Scaffold a new day (creates the solution + test files, and fetches/caches your personal input if `.env` is set up and the puzzle has unlocked):

```sh
bun run new 2015 1
```

This creates:

```
src/2015/day01/
  index.ts        # part1/part2 stubs + a runner (`bun src/2015/day01/index.ts`)
  index.test.ts    # sample-based test (skips until you fill it in) + room for unit tests
  sample.txt       # empty — paste in the worked example from the problem page
  input.txt        # your personal input, fetched automatically, gitignored
```

Fill in `sample.txt` with the example input from the problem, and the `SAMPLE_PART_1`/`SAMPLE_PART_2` constants at the top of `index.test.ts` with the expected answers, then implement `part1`/`part2`.

Other commands:

```sh
bun test                       # run all tests
bun run typecheck              # tsc --noEmit
bun run lint                   # eslint
bun run format                 # prettier --write
bun src/2015/day01/index.ts    # run one day directly and print both answers
```

`bun run new` is safe to re-run at any time — it never overwrites an existing solution or test file, and never re-fetches an input that's already cached.

## Project structure

- `src/<year>/day<NN>/` — one self-contained folder per puzzle.
- `lib/` — a shared library of helpers reused across days (grid/parsing/math utilities, etc.), imported via the `@lib` path alias. It starts empty and grows organically — a function moves here once it's needed by a second day, not before.
- `scripts/` — the scaffolding/fetch tool.

## Being considerate to adventofcode.com

Advent of Code generates a unique input per user, and its author has asked automated tools to be respectful of the server. This repo's fetch behavior (`scripts/internal/aoc-client.ts`) tries to honor that:

- An input is fetched **at most once, ever** — `bun run new` checks for an existing `input.txt` first and never re-requests it.
- Requests are **not** made before a puzzle's unlock time (midnight EST on its day) — no hammering the endpoint hoping it's ready.
- Requests identify the tool with a descriptive `User-Agent` including a contact link, as requested by AoC's author.
- The puzzle's prose/description is never fetched or scraped at all — only the plain-text personal input endpoint is used.

Per AoC's own stated policy, solution _code_ is fine to publish; puzzle _text_ and personal _inputs_ are not. `input.txt` is gitignored accordingly; `sample.txt` (a small worked example, needed to test the code and pasted in by hand from the problem page) is committed.
