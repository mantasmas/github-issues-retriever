import { GridSortModel } from "@material-ui/data-grid";
import { useState } from "react";
import { useQuery } from "react-query";
import { apiGetIssues, GetIssuesParams, Sorting } from "./apiIssues";

type GITHUB_FIELD = "comments" | "created_at" | "updated_at";
type SORTING_FIELD = "comments" | "created" | "updated";

const SORTING_MAP: Record<GITHUB_FIELD, SORTING_FIELD> = {
  comments: "comments",
  created_at: "created",
  updated_at: "updated",
};

type HookGithubIssuesParams = Pick<GetIssuesParams, "owner" | "repo">;

export function useGithubIssues({ owner, repo }: HookGithubIssuesParams) {
  const [page, setPage] = useState(1);
  const [sortingOptions, setSortingOptions] = useState<Sorting>({
    sort: "created",
    direction: "desc",
  });

  const { data, status } = useQuery(
    ["issues", owner, repo, page, sortingOptions],
    () => apiGetIssues({ owner, repo, page, sortingOptions }),
    { enabled: !!owner && !!repo }
  );

  const onChangePage = (newPage: number) => setPage(newPage);
  const onSort = (data: GridSortModel) => {
    const [model] = data;

    if (model) {
      setSortingOptions({
        direction: model.sort!,
        sort: SORTING_MAP[model.field as GITHUB_FIELD],
      });
    }
  };

  return {
    issues: data,
    page,
    issuesLoadingStatus: status,
    onChangePage,
    onSort,
  };
}
