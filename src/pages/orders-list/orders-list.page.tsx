import { Container, Stack } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppBarComponent from "../../components/app-bar.component";
import FloatingActionButton from "../../components/floating-action-button.component";
import TableDataComponent from "./components/table-data.component";
import AddIcon from '@mui/icons-material/Add';
import { OrdersApiService } from "../../services/orders-api.service";

export class OrdersListPage extends React.Component<{}> {
  render() {
    const queryClient = new QueryClient();
    return <div>
      <Container>
        <Stack spacing={5}>
          <AppBarComponent title='Orders' />
          <QueryClientProvider client={queryClient}>
            <TableDataComponent />
          </QueryClientProvider>
        </Stack>
      </Container>

      <FloatingActionButton
        icon={<AddIcon />}
        onClick={OrdersApiService.create} />
    </div>;
  }
}