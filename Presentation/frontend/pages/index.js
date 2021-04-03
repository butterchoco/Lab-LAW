import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../components/socket.io";

export default function Home() {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("user_connected", (data) => {
      setUsers(data);
    });
    socket.emit("user_connected", { id: 123 });
    return () => {
      socket.off("user_connected");
      socket.disconnect();
    };
  }, []);

  return <></>;
}
