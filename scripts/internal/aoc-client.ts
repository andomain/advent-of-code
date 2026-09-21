// A small, deliberately polite client for adventofcode.com.
//
// Etiquette this file exists to enforce (see README for the sources):
//   - Every input is fetched at most once, ever, and cached to disk
//     (enforced by the caller checking for an existing input.txt first).
//   - Requests identify the tool via a descriptive User-Agent with a contact
//     link, as Eric Wastl has asked automated tools to do.
//   - We refuse to fetch before a puzzle's unlock time (midnight EST on its
//     day), rather than hammering the endpoint hoping it's ready.
import pkg from "../../package.json" with { type: "json" };

const AOC_BASE_URL = "https://adventofcode.com";
const USER_AGENT = `${pkg.homepage} by github.com/andomain`;

export class AocClientError extends Error {}

/** Puzzles unlock at midnight EST (UTC-5, no DST in December) on their day. */
export function unlocksAt(year: number, day: number): Date {
  return new Date(Date.UTC(year, 11, day, 5, 0, 0));
}

function authHeaders(sessionCookie: string): Record<string, string> {
  return {
    Cookie: `session=${sessionCookie}`,
    "User-Agent": USER_AGENT,
  };
}

export async function fetchInput(
  year: number,
  day: number,
  sessionCookie: string,
): Promise<string> {
  const unlock = unlocksAt(year, day);
  if (Date.now() < unlock.getTime()) {
    throw new AocClientError(
      `Day ${day} of ${year} unlocks at ${unlock.toISOString()} — not yet available.`,
    );
  }

  const res = await fetch(`${AOC_BASE_URL}/${year}/day/${day}/input`, {
    headers: authHeaders(sessionCookie),
  });

  if (res.status === 404) {
    throw new AocClientError(
      `${year} day ${day} not found — check the year/day are valid (year >= 2015, day 1-25).`,
    );
  }
  if (!res.ok) {
    throw new AocClientError(
      `Failed to fetch input for ${year} day ${day}: HTTP ${res.status}. ` +
        `Check AOC_SESSION_COOKIE in .env is set and not expired.`,
    );
  }

  const text = await res.text();
  return text.trimEnd() + "\n";
}
