import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { ExternalLink } from "react-feather";

function Header() {
  return (
    <Container
      maxW={"100%"}
      position={"fixed"}
      zIndex={2}
      bg={"white"}
      top={0}
      border="1px"
      p={"20px"}
      borderColor="gray.200"
      mb={3}
      display={{ base: "none", sm: "block" }}
    >
      <Flex justifyContent={"space-around"}>
        <Box fontSize={"18px"} color={"gray.700"} fontWeight={"medium"}>
          CollabDays - Optical character recognition
        </Box>
        <Box>
          <Text
            display={"flex"}
            as={"a"}
            href={"https://www.mersihaceranic.com/"}
            target={"_blank"}
            fontSize={"18px"}
            alignItems={"center"}
          >
            <ExternalLink />
            <Text fontWeight={"medium"} ml={"3px"} color={"gray.700"}>
              mersihaceranic.com
            </Text>
          </Text>
        </Box>
      </Flex>
    </Container>
  );
}
export default Header;
