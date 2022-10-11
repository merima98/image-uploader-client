import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Header from "./features/header/components/Header";
import Home from "./features/home/components/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Home />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
