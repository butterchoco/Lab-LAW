import { Box, Button, Center, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [filelist, setFilelist] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get("a_t");
    if (!accessToken)
      window.location =
        "http://localhost:8001/auth?client_id=" +
        process.env.NEXT_PUBLIC_CLIENT_ID;
  }, []);

  const onSubmit = () => {
    const formData = new FormData();
    Array.from(filelist).forEach((file) => {
      formData.append("files", file);
    });
    axios
      .post("http://localhost:8001/file/compress", formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        alert(res.data.link);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Center height="100vh">
      <Box width="md" boxShadow="sm" display="flex" flexDir="column">
        <Input
          multiple
          type="file"
          placeholder="Add files to be compressed"
          onChange={(e) => setFilelist(e.target.files)}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Box>
    </Center>
  );
}
