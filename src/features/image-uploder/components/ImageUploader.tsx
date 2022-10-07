import {
  Text,
  Button,
  Container,
  Image,
  Img,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useMutation } from "react-query";

import upload from "../../../images/upload.png";
import noImageSelected from "../../../images/noImageSelected.png";
import mutations from "../../../api/mutations/mutations";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const processImageMutation = useMutation(mutations.processImage, {
    onSuccess: (data) => {
      console.log("Data is, ", data);
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
    if (image) console.log("Image is, ", image);
    if (image) {
      console.log("Image that needs to be processed, ", image);
      processImageMutation.mutate(image);
    }
  };

  return (
    <>
      <Container
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        padding="4"
        border="2px dashed rgba(0,0,0,0.1)"
        alignItems="center"
        w={"80%"}
        borderRadius="md"
        maxW={"auto"}
        mb={5}
        mt={10}
        {...getRootProps()}
        zIndex={0}
      >
        <Flex alignItems={"center"}>
          <Text color={"red.500"} fontWeight={"medium"}>
            {"Browse image or drag&drop image"}
          </Text>
          <Button
            _hover={{
              background: "#fff",
            }}
            _focus={{
              background: "#fff",
            }}
            backgroundColor={"#fff"}
            onClick={open}
          >
            <Image src={upload} />
          </Button>
          <input name={"image"} {...getInputProps()} />
        </Flex>
      </Container>
      {image && (
        <Center mb={5}>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => processImage()}
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
          <Text fontSize={"24px"} fontWeight={"medium"} color={"red.500"}>
            Oops! No image selected yet.
          </Text>
          <Img
            display={"flex"}
            src={noImageSelected}
            alt="preview"
            mt={10}
            mb={10}
          />
        </Container>
      )}
      <Container maxW={"auto"} display={"flex"} justifyContent={"center"}>
        {image && <Img display={"flex"} src={image} alt="preview" mb={10} />}
      </Container>
    </>
  );
};

export default ImageUploader;
