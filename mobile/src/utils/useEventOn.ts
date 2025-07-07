import { useEffect } from "react";
import eventEmitter from "./eventEmit";

interface UseEventOnOptions {
  event: string | string[];
  handler: (data: any) => void;
}

export const useEventOn = ({ event, handler }: UseEventOnOptions) => {
  useEffect(() => {
    const eventList = Array.isArray(event) ? event : [event];

    eventList.forEach((evt) => {
      eventEmitter.on(evt, handler);
    });

    return () => {
      eventList.forEach((evt) => {
        eventEmitter.off(evt, handler);
      });
    };
  }, [event, handler]);
};
