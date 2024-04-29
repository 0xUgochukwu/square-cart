/** @format */

import io from "socket.io-client";
import { useEffect, useState } from "react";
import { getCookieData } from "../services/storage";
import { useToast } from "../components/ui/use-toast";
import { ENDPOINT } from "../constants/api";
import { ToastAction } from "../components/ui/toast";

let socket: any = null;

function Socket() {
  const [transaction, setTransaction] = useState<any>(null);
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
      console.log(msg)
      setTransaction(msg);
      toast({
        title: "WooHoo!!!",
        description: `${msg.customer.name} just bought ${msg.item.name}`,
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

  return transaction;
}

export default Socket;
