import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const ClickContext = createContext();

export const useClickContext = () => useContext(ClickContext);

export const ClickProvider = ({ children }) => {
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showHiddenPage, setShowHiddenPage] = useState(false);

  const handleClick = useCallback(() => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 500) { // 500ms threshold for "quick" clicks
      setClicks(prevClicks => {
        const newClicks = prevClicks + 1;
        if (newClicks >= 5) {
          setShowHiddenPage(true);
        }
        return newClicks;
      });
    } else {
      setClicks(1);
    }
    setLastClickTime(currentTime);
  }, [lastClickTime]);

  return (
    <ClickContext.Provider value={{ showHiddenPage, handleClick }}>
      {children}
    </ClickContext.Provider>
  );
};