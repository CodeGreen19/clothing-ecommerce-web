import { useState, useRef, useCallback } from "react";

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startCountdown = useCallback(
    (minutes: number) => {
      if (isRunning) return; // Prevent multiple countdowns from running

      setIsRunning(true);
      let totalSeconds = minutes * 60;
      setTimeLeft(formatTime(totalSeconds));

      intervalRef.current = setInterval(() => {
        totalSeconds -= 1;
        setTimeLeft(formatTime(totalSeconds));

        if (totalSeconds <= 0) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
        }
      }, 1000);
    },
    [isRunning],
  );

  const resetCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTimeLeft("00:00"); // Reset to default value
  }, []);

  return { timeLeft, isRunning, startCountdown, resetCountdown };
};

export default useCountdown;
