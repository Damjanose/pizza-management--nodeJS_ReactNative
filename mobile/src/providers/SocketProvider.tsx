import React, { createContext, useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { ChildrenProp, TSocketContext } from "./types";
import eventEmitter from "../utils/eventEmit.ts";

const SOCKET_URL = "http://89.116.236.24:3000/pizza";
const SOCKET_URL_TRIGGER_EVENT = "http://89.116.236.24:3000/trigger-event";
const SOCKET_NAMESPACE = "/pizza";

export const SocketContext = createContext<TSocketContext | null>(null);

export const SocketProvider = ({ children }: ChildrenProp) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(() => {
    const newSocket = io(SOCKET_URL, { path: SOCKET_NAMESPACE });
    setSocket(newSocket);
  }, []);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);

  const emitEvent = useCallback(async (eventName: string, data?: any) => {
    try {
      const payload = {
        event: eventName,
        namespace: SOCKET_NAMESPACE,
        message: data,
      };

      const response = await axios.post(SOCKET_URL_TRIGGER_EVENT, payload, {
        headers: { "Content-Type": "application/json" },
      });

      eventEmitter.emit(response.data.event);

      return response.data.event;
    } catch (error: any) {
      console.error(
        "❌ Emit socket error:",
        error.response?.data || error.message
      );
    }
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, connectSocket, disconnectSocket, emitEvent }}
    >
      {children}
    </SocketContext.Provider>
  );
};
