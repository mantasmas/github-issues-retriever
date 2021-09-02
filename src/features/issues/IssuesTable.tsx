import { QueryStatus } from "react-query";
import styled from "styled-components";
import { Button, CircularProgress } from "@material-ui/core";
import { DataGrid, GridColumns, GridSortModel } from "@material-ui/data-grid";
import BackIcon from "@material-ui/icons/ArrowBack";
import ForwardIcon from "@material-ui/icons/ArrowForward";
import { GithubIssues } from "../../state/types";

const TEXT = {
  NO_DATA: "No data found!",
  PREVIOUS: "Previous",
  NEXT: "Next",
};

interface IssuesTableProps {
  loadingStatus?: QueryStatus;
  issues?: GithubIssues;
  page: number;
  onChangePage: (page: number) => void;
  onChangeSort: (page: GridSortModel) => void;
}

const PaginationActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const PageNumber = styled.span`
  margin: 0 8px;
`;

const columns: GridColumns = [
  { field: "state", headerName: "State", width: 130 },
  { field: "title", headerName: "Title", width: 400, sortable: false },
  { field: "created_at", headerName: "Created on", width: 200 },
  { field: "updated_at", headerName: "Updated on", width: 200 },
  { field: "comments", headerName: "Comments #", width: 180 },
];

export function IssuesTable({
  loadingStatus,
  issues,
  page,
  onChangePage,
  onChangeSort,
}: IssuesTableProps) {
  if (loadingStatus === "loading" && !issues)
    return <CircularProgress data-testid="loader" />;
  if (loadingStatus === "error") return <div>{TEXT.NO_DATA}</div>;

  if (!issues) return null;

  return (
    <>
      <DataGrid
        rows={issues}
        columns={columns}
        autoHeight
        loading={loadingStatus === "loading"}
        hideFooter
        onPageChange={(page) => onChangePage(page)}
        onSortModelChange={(model) => onChangeSort(model)}
        sortingMode="server"
      />
      <PaginationActions>
        <Button
          variant="contained"
          startIcon={<BackIcon />}
          color="primary"
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
        >
          {TEXT.PREVIOUS}
        </Button>
        <PageNumber>{page}</PageNumber>
        <Button
          variant="contained"
          endIcon={<ForwardIcon />}
          color="primary"
          disabled={!issues.length}
          onClick={() => onChangePage(page + 1)}
        >
          {TEXT.NEXT}
        </Button>
      </PaginationActions>
    </>
  );
}
