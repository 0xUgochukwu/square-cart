/** @format */

import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../constants/api";
import { useEffect, useState } from "react";
import { getCookieData } from "../services/storage";
import { ToastAction } from "../components/ui/toast";
import { useToast } from "../components/ui/use-toast";

const Socket = () => {
    const [transaction, setTransaction] = useState<any>(null);
    const { toast } = useToast();

    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      const data = getCookieData("user");

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on(`sold-${data._id.toString()}`, (newTransaction) => {
        console.log("New transaction received:", newTransaction);
        toast({
          title: "WooHoo!!!",
          description: `${newTransaction.transaction.customer.name} just bought ${newTransaction.transaction.item.name}`,
          action: <ToastAction altText='done'>done</ToastAction>,
        });
      });

      return () => socket.disconnect();
    }, []);

    return transaction;
}

export default Socket;