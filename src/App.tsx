import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { IssuesScreen } from "./features/issues";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IssuesScreen />
    </QueryClientProvider>
  );
}

export default App;
