import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChildrenProp, TSocketContext } from "./types";

// SOCKET_URL='http://89.116.236.24:3000/test'    to listen
// SOCKET_URL_TRIGGER_EVENT='http://89.116.236.24:3000/trigger-event'  to emit

export const SocketContext = createContext<TSocketContext | null>(null);

export const SocketProvider = ({ children }: ChildrenProp) => {
  const socketUri = "http://89.116.236.24:3000/pizza";
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoggingEnabled, setIsLoggingEnabled] = useState(false);

  const connectSocket = () => {
    if (socketUri && !isLoggingEnabled) {
      const newSocket = io(socketUri);
      setIsLoggingEnabled(true);
      setSocket(newSocket);
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const emitEvent = (eventName: string, data?: any) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  useEffect(() => {
    if (socketUri) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [socketUri]);

  return (
    <SocketContext.Provider
      value={{ socket, connectSocket, disconnectSocket, emitEvent }}
    >
      {children}
    </SocketContext.Provider>
  );
};
