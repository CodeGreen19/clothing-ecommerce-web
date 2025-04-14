"use client";
import { useEffect, useState } from "react";

export const GlobalNetworkErrorHandler = () => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return offline ? (
    <div
      style={{
        color: "red",
        backgroundColor: "white",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      ⚠️ No internet connection !
    </div>
  ) : null;
};
