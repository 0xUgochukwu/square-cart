/** @format */

import io from "socket.io-client";
import { ENDPOINT } from "../constants/api";
import { useEffect, useState } from "react";
import { getCookieData } from "../services/storage";
import { ToastAction } from "../components/ui/toast";
import { useToast } from "../components/ui/use-toast";

const socket = io(ENDPOINT);

const Socket = () => {
  const [transaction, setTransaction] = useState<any>(null);
  const { toast } = useToast();
  const data = getCookieData("user");
  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    socket.on(`sold-${data._id.toString()}`, (msg) => {
      setTransaction((prevMessages: any) => [...prevMessages, msg]);
      toast({
        title: "WooHoo!!!",
        description: `${msg.transaction.customer.name} just bought ${msg.transaction.item.name}`,
        action: <ToastAction altText='done'>done</ToastAction>,
      });
    });
  }, [data._id, toast]);

  return transaction;
};

export default Socket;
