import { request } from "@octokit/request";
import { GithubIssues } from "./types";

export interface GetIssuesParams {
  owner: string;
  repo: string;
  page: number;
  sortingOptions?: Sorting;
}

export interface Sorting {
  direction: "asc" | "desc";
  sort: "comments" | "created" | "updated";
}

export async function apiGetIssues({
  owner,
  repo,
  page,
  sortingOptions,
}: GetIssuesParams) {
  const { data } = await request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    page,
    ...sortingOptions,
  });

  return data as GithubIssues;
}
