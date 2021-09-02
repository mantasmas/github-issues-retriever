import { render } from "@testing-library/react";
import { GithubIssues } from "../../../state/types";
import { IssuesTable } from "../IssuesTable";

describe("IssuesTable", () => {
  it("should show loader when data is loading", () => {
    const component = render(
      <IssuesTable
        loadingStatus="loading"
        page={1}
        onChangePage={() => {}}
        onChangeSort={() => {}}
      />
    );

    expect(component.container.children.length).toEqual(1);
  });

  it("should show nothing if there is no data loaded", () => {
    const component = render(
      <IssuesTable
        loadingStatus="success"
        page={1}
        onChangePage={() => {}}
        onChangeSort={() => {}}
      />
    );

    expect(component.container.children.length).toEqual(0);
  });

  it("should show error message if there is an error", () => {
    const component = render(
      <IssuesTable
        loadingStatus="error"
        page={1}
        onChangePage={() => {}}
        onChangeSort={() => {}}
      />
    );

    expect(component.getAllByText("No data found!").length).toEqual(1);
  });

  it("should display issue rows + header row", () => {
    const FAKE_ISSUES = [
      {
        id: 11,
      },
      {
        id: 13,
      },
    ] as GithubIssues;

    const component = render(
      <IssuesTable
        loadingStatus="success"
        issues={FAKE_ISSUES}
        page={1}
        onChangePage={() => {}}
        onChangeSort={() => {}}
      />
    );

    expect(component.getAllByRole("row").length).toEqual(3);
  });
});
