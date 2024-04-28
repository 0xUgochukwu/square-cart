import { format } from "date-fns";

export const filterAndSortGraphData = (data: any) => {
  if (!data) {
    return "";
  }
  console.log(data);
  return data
    .map((transaction: any) => ({
      date: new Date(transaction.createdAt),
      amount: transaction.amount,
    }))
    .sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
    .map((transaction: any, index: 0) => {
      if (index == 0 || data.length - 1 == index) {
        console.log(transaction);
        return {
          date: format(transaction.date, "MMM d yyyy"),
          amount: transaction.amount,
        };
      }
      if (index > 0 && index < data.length) {
        return {
          amount: transaction.amount,
        };
      }
    });
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const formatAmount = (amount: number) => {
  if (amount == null || isNaN(amount)) {
    return "0.00";
  }

  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const encodeIfURL = (str: string) : string => {
  try {
    const url = new URL(str);
    return encodeURI(str);
  } catch (error) {
    return str;
  }
};