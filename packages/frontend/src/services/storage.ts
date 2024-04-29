/** @format */

import { useNavigate } from "react-router-dom";

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const getCookie = (name: string) => {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

export const clearCookie = (name: string) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
};

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  return data;
};


export const getCookieData = (dataType: string) => {
  const data = getCookie(dataType === "user" ? "@user" : "@token");
  console.log(data);
  if (data) {
    const jsonData = JSON.parse(data);
    return dataType === "user"
      ? jsonData
      : {
          headers: {
            Authorization: `Bearer ${jsonData}`,
          },
        };
  }
  return null;
};

export const Logout = () => {
  clearCookie("@user");
  const navigate = useNavigate();
  navigate("/");
};
