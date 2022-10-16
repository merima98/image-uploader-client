import {
  Text,
  Button,
  Container,
  Image,
  Img,
  Progress,
  Flex,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hookz/web";
import React from "react";

import upload from "../../../images/upload.png";
import noImageSelected from "../../../images/noImageSelected.png";
import mutations from "../../../api/mutations/mutations";
import Table from "../../table/components/Table";

const ImageUploader = () => {
  const toast = useToast();
  const [image, setImage] = useState(null);
  const [isLoadingSpinnerActive, setIsLoadingSpinnerActive] = useState(false);
  const isLargeDevice = useMediaQuery("only screen and (min-width: 80em)");
  const boxProps = isLargeDevice ? { whileHover: { scale: 1.1 } } : {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableData, setTableData] = useState<any[]>([]);

  const processImageMutation = useMutation(mutations.processImage, {
    onSuccess: (data) => {
      toast({
        title: "Image processed.",
        description: "Image processing is done!",
        status: "info",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
      onOpen();
      setIsLoadingSpinnerActive(false);

      let array = [];
      array.push(data.data);
      setTableData(array);
    },
  });

  const onDrop = (files: File[]) => {
    const file = files[0];
    let fileReader = null as any;
    fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const { result } = e.target;
      setImage(result);
    };
    fileReader.readAsDataURL(file);
  };

  const options: DropzoneOptions = {
    noClick: true,
    noKeyboard: true,
    onDrop,
  };
  const { getRootProps, getInputProps, open } = useDropzone(options);

  const processImage = () => {
    if (image)
      if (image) {
        processImageMutation.mutate(image);
        toast({
          title: "Image processing.",
          description: "Image processing is in the process.",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        setIsLoadingSpinnerActive(true);
      }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Passport Number",
        accessor: "Passport_Number",
      },
      {
        Header: "First Name",
        accessor: "First_Name",
      },
      {
        Header: "Last Name",
        accessor: "Last_Name",
      },
      {
        Header: "Country Code",
        accessor: "Country_Code",
      },
      {
        Header: "Document Type",
        accessor: "Document_Type",
      },
      {
        Header: "Date Inserted",
        accessor: "Date_Inserted",
      },
    ],
    []
  );

  return (
    <>
      <Container
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        pl={0}
        pr={0}
        pb={6}
        pt={6}
        backgroundColor={"white"}
        border="2px dashed #2D3748"
        alignItems="center"
        w={"80%"}
        borderRadius="md"
        maxW={"auto"}
        mb={"100px"}
        mt={"100px"}
        {...getRootProps()}
        zIndex={0}
      >
        <Flex alignItems={"center"}>
          <Text color={"gray.700"} fontSize={"24px"} fontWeight={"medium"}>
            {"Browse image or drag&drop image"}
          </Text>
          <Button
            _hover={{
              background: "inherit",
            }}
            _focus={{
              background: "inherit",
            }}
            backgroundColor={"inherit"}
            onClick={open}
          >
            <Image src={upload} />
          </Button>
          <input name={"image"} {...getInputProps()} />
        </Flex>
      </Container>
      {isLoadingSpinnerActive && (
        <Container>
          <Center>
            <Flex w={"100%"} flexDirection={"column"}>
              <Text
                mb={2}
                color={"gray.700"}
                fontWeight={"bold"}
                fontSize={"24px"}
                textAlign={"center"}
              >
                Processing...
              </Text>
              <Progress mb={5} w={"80%"} size="xs" isIndeterminate />
            </Flex>
          </Center>
        </Container>
      )}
      {image && !isLoadingSpinnerActive && (
        <Center mb={5}>
          <Button
            as={motion.button}
            {...boxProps}
            whileTap={{ scale: 0.9 }}
            color={"gray.700"}
            colorScheme={"gray.700"}
            border={"1px solid #2D3748"}
            variant="outline"
            onClick={() => processImage()}
            mb={"50px"}
            size={"lg"}
            backgroundColor={"white"}
            _hover={{
              backgroundColor: "white",
            }}
            _focus={{ backgroundColor: "white" }}
            _selected={{ backgroundColor: "white" }}
          >
            Process the image
          </Button>
        </Center>
      )}
      {!image && (
        <Container
          maxW={"auto"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Text fontSize={"24px"} fontWeight={"medium"} color={"gray.700"}>
            Oops! No image selected yet.
          </Text>
          <Img
            display={"flex"}
            src={noImageSelected}
            alt="preview"
            height={"250px"}
            width={"300px"}
            mt={10}
            mb={10}
          />
        </Container>
      )}
      <Container maxW={"auto"} display={"flex"} justifyContent={"center"}>
        {image && <Img display={"flex"} src={image} alt="preview" mb={10} />}
      </Container>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={"fit-content"}>
            <ModalHeader fontSize={"16px"}>Processing output</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {tableData && <Table data={tableData} columns={columns} />}
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={onClose}
                as={motion.button}
                {...boxProps}
                whileTap={{ scale: 0.9 }}
                color={"gray.700"}
                colorScheme={"gray.700"}
                border={"1px solid #2D3748"}
                variant="outline"
                size={"sm"}
                backgroundColor={"white"}
                _hover={{
                  backgroundColor: "white",
                }}
                _focus={{ backgroundColor: "white" }}
                _selected={{ backgroundColor: "white" }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default ImageUploader;
