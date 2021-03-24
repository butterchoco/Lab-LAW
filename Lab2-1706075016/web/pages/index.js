import { Box, Button, Center, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [filelist, setFilelist] = useState([]);

  useEffect(() => {});

  const onSubmit = () => {
    const formData = new FormData();
    Array.from(filelist).forEach((file) => {
      formData.append("files", file);
    });
    axios.post("http://localhost:8001/file/compress", formData).then((res) => {
      alert(res.data.link);
    });
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
