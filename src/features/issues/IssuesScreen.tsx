import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useGithubIssues } from "../../state/issues";
import { GetIssuesParams } from "../../state/apiIssues";
import { IssuesTable } from "./IssuesTable";

const TEXT = {
  FIELD_REQUIRED: "Field is required",
  SEARCH_BUTTON: "I want issues!",
};

type SearchFormFields = Pick<GetIssuesParams, "owner" | "repo">;

const SearchForm = styled.form.attrs({
  noValidate: true,
  autoComplete: "off",
})`
  display: flex;
  justify-content: space-around;
  margin: 32px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 32px;
`;

export function IssuesScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormFields>();
  const [searchData, setSearchData] = useState<SearchFormFields>({
    owner: "",
    repo: "",
  });
  const onSubmit = (data: SearchFormFields) => setSearchData(data);

  const { issues, issuesLoadingStatus, page, onChangePage, onSort } =
    useGithubIssues(searchData);

  return (
    <div>
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Organization"
          error={!!errors.owner}
          helperText={!!errors.owner && TEXT.FIELD_REQUIRED}
          {...register("owner", { required: true, value: "callstack" })}
        />
        <TextField
          label="Repo"
          error={!!errors.repo}
          helperText={!!errors.repo && TEXT.FIELD_REQUIRED}
          {...register("repo", { required: true, value: "react-native-paper" })}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SearchIcon />}
          type="submit"
        >
          {TEXT.SEARCH_BUTTON}
        </Button>
      </SearchForm>
      <TableWrapper>
        <IssuesTable
          loadingStatus={issuesLoadingStatus}
          issues={issues}
          page={page}
          onChangePage={onChangePage}
          onChangeSort={onSort}
        />
      </TableWrapper>
    </div>
  );
}
