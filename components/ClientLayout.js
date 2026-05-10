"use client";

import { useState, useCallback } from "react";
import SplashScreen from "./SplashScreen";

export default function ClientLayout({ children }) {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
