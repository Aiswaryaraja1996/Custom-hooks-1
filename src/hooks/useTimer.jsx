import { useState, useEffect, useRef } from "react";

function useTimer({ initVal = 0 }) {
  const [value, setValue] = useState(initVal);
  const ref = useRef(null);

  const startTimer = () => {
    if (!ref.current) {
      ref.current = setInterval(() => {
        setValue((prev) => {
          if (prev - 1 === 0) {
            pauseTimer();
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setValue(initVal);
  };

  useEffect(() => {
    return pauseTimer;
  }, []);

  return { value, startTimer, pauseTimer, resetTimer };
}

export default useTimer;
