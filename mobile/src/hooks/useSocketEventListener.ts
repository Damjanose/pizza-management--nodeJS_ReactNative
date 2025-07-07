import { useEffect } from "react";
import { io } from "socket.io-client";

interface UseSocketEventProps {
  event: string;
  handler: (data: any) => void;
}

const useSocketEventListener = ({ event, handler }: UseSocketEventProps) => {
  const socketUri = "http://89.116.236.24:3000/pizza";

  useEffect(() => {
    if (!socketUri) return;

    const socket = io(socketUri);

    socket.off(event);
    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
      socket.disconnect();
    };
  }, [socketUri, event, handler]);
};

export default useSocketEventListener;
