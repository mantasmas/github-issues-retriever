import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Sorting } from "../apiIssues";
import { useGithubIssues } from "../issues";
import { GithubIssues } from "../types";

const MOCK_ISSUES = [{ id: "1" }, { id: "2" }] as Partial<GithubIssues[0]>;
const SORTED_MOCK_ISSUES = [{ id: "2" }, { id: "1" }] as Partial<
  GithubIssues[0]
>;

jest.mock("../apiIssues", () => ({
  apiGetIssues: ({ sortingOptions }: { sortingOptions: Sorting }) => {
    if (sortingOptions.sort === "comments") return SORTED_MOCK_ISSUES;

    return MOCK_ISSUES;
  },
}));

describe("issues hook", () => {
  it("should return data from server", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(
      () =>
        useGithubIssues({
          owner: "test",
          repo: "repo",
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => result.current.issuesLoadingStatus === "success");

    expect(result.current.issues).toEqual(MOCK_ISSUES);
  });

  it("should return sorted data", async () => {
    await act(async () => {
      const queryClient = new QueryClient();
      const wrapper = ({ children }: PropsWithChildren<{}>) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result, waitFor } = renderHook(
        () =>
          useGithubIssues({
            owner: "asd",
            repo: "asd",
          }),
        {
          wrapper,
        }
      );

      await waitFor(() =>
        result.current.onSort([{ field: "comments", sort: "asc" }])
      );

      expect(result.current.issues).toEqual(SORTED_MOCK_ISSUES);
    });
  });

  it("should change issues page", async () => {
    await act(async () => {
      const queryClient = new QueryClient();
      const wrapper = ({ children }: PropsWithChildren<{}>) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result, waitFor } = renderHook(
        () =>
          useGithubIssues({
            owner: "asd",
            repo: "asd",
          }),
        {
          wrapper,
        }
      );

      await waitFor(() => result.current.onChangePage(2));

      expect(result.current.page).toEqual(2);
    });
  });
});
