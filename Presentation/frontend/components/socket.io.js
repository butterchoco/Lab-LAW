import { createContext } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(process.env.NEXT_PUBLIC_BACKEND_URL);

export const SocketContext = createContext(socket);
