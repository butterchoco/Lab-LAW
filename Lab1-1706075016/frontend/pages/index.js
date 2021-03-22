import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const { query } = router;
  const { handleSubmit, errors, register, formState } = useForm();
  const [hasil, setHasil] = useState("");
  const numericOnly = new RegExp("^[0-9]*$");

  useEffect(() => {
    if (query.a && query.b) {
      onSubmit({ a: query.a, b: query.b });
    }
  }, [router]);

  const validateA = (value) => {
    if (!value) {
      return "Nilai A dibutuhkan";
    } else if (!numericOnly.test(value)) {
      return "Nilai A hanya numerik";
    } else return true;
  };

  const validateB = (value) => {
    if (!value) {
      return "Nilai B dibutuhkan";
    } else if (!numericOnly.test(value)) {
      return "Nilai B hanya numerik";
    } else return true;
  };

  const onSubmit = (values) => {
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setHasil(res.data.hasil);
      })
      .catch((e) =>
        toast({
          title: "Failed to fetch data",
          description: e.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  };

  return (
    <Center height="100vh">
      <Box width="md" boxShadow="sm" display="flex" flexDir="column">
        <Heading>Hasil: {hasil}</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.a}>
            <FormLabel htmlFor="a">Nilai A</FormLabel>
            <Input
              name="a"
              placeholder="Masukkan nilai A"
              ref={register({ validate: validateA })}
            />
            <FormErrorMessage>{errors.a && errors.a.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.b}>
            <FormLabel htmlFor="b">Nilai B</FormLabel>
            <Input
              name="b"
              placeholder="Masukkan nilai B"
              ref={register({ validate: validateB })}
            />
            <FormErrorMessage>{errors.b && errors.b.message}</FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
}
