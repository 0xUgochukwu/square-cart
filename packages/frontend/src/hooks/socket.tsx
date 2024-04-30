/** @format */

import io from "socket.io-client";
import { useEffect } from "react";
import { getCookieData } from "../services/storage";
import { useToast } from "../components/ui/use-toast";
import { ENDPOINT } from "../constants/api";
import { ToastAction } from "../components/ui/toast";

let socket: any = null;

function Socket() {
  const { toast } = useToast();
  const user: any = getCookieData("user");

  useEffect(() => {
    if (!user) return;

    if (!socket) {
      socket = io(ENDPOINT);

      socket.on("connect_error", (error: Error) => {
        console.error("Socket connection error:", error);
      });
    }

    const handleSoldEvent = (msg: any) => {
      const { customer, item } = msg.transaction;
      toast({
        title: "WooHoo!!!",
        description: `${customer.name} just bought ${item.name}`,
        action: <ToastAction altText='done'>done</ToastAction>,
      });
    };


    socket.on(`sold-${user._id}`, handleSoldEvent);

    return () => {
      if (socket) {
        socket.off(`sold-${user._id}`, handleSoldEvent);
      }
    };
  }, [user, toast]);

  return null;
}

export default Socket;
