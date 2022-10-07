import { ChakraProvider } from "@chakra-ui/react";

import Home from "./features/home/components/Home";

function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
