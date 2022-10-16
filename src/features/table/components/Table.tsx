import { useTable } from "react-table";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Text,
  Tbody,
  Td,
  Center,
  Box,
} from "@chakra-ui/react";
import { map } from "ramda";

type props = {
  size?: "sm" | "md" | "lg";
  columns: any;
  data: any;
};

function Table(props: props) {
  const { size = "sm", columns, data } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Center>
      <ChakraTable
        size={size}
        {...getTableProps()}
        mt={5}
        w={{ base: "100vw", md: "70vw" }}
        mb={8}
      >
        <Thead position={"sticky"} top={"2.5rem"} zIndex={3}>
          {map(
            (group: any) => (
              <Tr
                display={{ base: "flex", md: "table-row" }}
                flexDirection={{ base: "column", md: "row" }}
                {...group.getHeaderGroupProps()}
                key={group.getHeaderGroupProps().key}
              >
                {map(
                  (column: any) => (
                    <Th zIndex={2} p={2} key={column.getHeaderProps().key}>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                      >
                        {column.render("Header")}
                      </Box>
                      <Text>
                        {column.canFilter &&
                        column.render("Header") !== "Actions" &&
                        column.render("Header") !== "Status"
                          ? column.render("Filter")
                          : null}
                      </Text>
                    </Th>
                  ),
                  group.headers
                )}
              </Tr>
            ),
            headerGroups
          )}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {map((row: any) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={row.getRowProps().key}
                display={{ base: "flex", md: "table-row" }}
                flexDirection={{ base: "column", md: "row" }}
              >
                {map((cell: any) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                      textAlign={"center"}
                      display={{ base: "flex", md: "table-cell" }}
                      flexDirection={"row"}
                      justifyContent={"center"}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                }, row.cells)}
              </Tr>
            );
          }, rows)}
        </Tbody>
      </ChakraTable>
    </Center>
  );
}

export default Table;
