import { afterEach, expect, spyOn, test } from "bun:test";
import { fetchRepos, fetchWakaSection, selectRecentProjects } from "./generate-readme.ts";

afterEach(() => {
  mockFetch?.mockRestore();
});
let mockFetch: ReturnType<typeof spyOn<typeof globalThis, "fetch">> | undefined;

const repo = {
  name: "diskmon",
  html_url: "https://github.com/auron-labs/diskmon",
  description: "Disk health monitoring",
  homepage: null,
  private: false,
  fork: false,
  archived: false,
  language: "Rust",
  topics: [],
  pushed_at: new Date().toISOString(),
};

test("organization repositories are paginated through the public endpoint", async () => {
  mockFetch = spyOn(globalThis, "fetch")
    .mockResolvedValueOnce(Response.json(Array.from({ length: 100 }, () => repo)))
    .mockResolvedValueOnce(Response.json([repo]));
  expect(await fetchRepos("auron-labs", "orgs")).toHaveLength(101);
  expect(mockFetch.mock.calls.map(([url]) => String(url))).toEqual([
    "https://api.github.com/orgs/auron-labs/repos?type=public&sort=updated&direction=desc&per_page=100&page=1",
    "https://api.github.com/orgs/auron-labs/repos?type=public&sort=updated&direction=desc&per_page=100&page=2",
  ]);
});

test("projects exclude private, forked, archived, old and excluded repositories", () => {
  expect(
    selectRecentProjects([
      { ...repo, private: true },
      { ...repo, fork: true },
      { ...repo, archived: true },
      { ...repo, pushed_at: "2000-01-01T00:00:00Z" },
      { ...repo, name: "github-profile" },
      { ...repo, name: "older", pushed_at: new Date(Date.now() - 86_400_000).toISOString() },
      repo,
    ]).map(({ name }) => name),
  ).toEqual(["diskmon", "older"]);
});

test("WakaTime fetch renders weekly languages and preserves content while processing", async () => {
  mockFetch = spyOn(globalThis, "fetch").mockResolvedValueOnce(
    Response.json({
      data: {
        human_readable_total: "2 hrs",
        languages: [{ name: "Rust", text: "2 hrs", percent: 100 }],
      },
    }),
  );
  const result = await fetchWakaSection("test-key");
  expect(result).toContain("Last 7 days: 2 hrs");
  expect(result).toContain("Rust");
  expect(result).toContain("100.00%");
  expect(mockFetch.mock.calls[0]?.[1]?.headers).toEqual({ Authorization: "Basic dGVzdC1rZXk=" });
  mockFetch.mockResolvedValueOnce(new Response(null, { status: 202 }));
  expect(await fetchWakaSection("test-key")).toBeNull();
  expect(await fetchWakaSection("")).toBeNull();
  expect(mockFetch).toHaveBeenCalledTimes(2);
  mockFetch.mockResolvedValueOnce(new Response(null, { status: 401 }));
  await expect(fetchWakaSection("bad-key")).rejects.toThrow("WakaTime API request failed: 401");
});
