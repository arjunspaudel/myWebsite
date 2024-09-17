import React, { createContext, useState, useContext, useCallback } from 'react';

const ClickContext = createContext();

export const useClickContext = () => useContext(ClickContext);

export const ClickProvider = ({ children }) => {
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showHiddenPage, setShowHiddenPage] = useState(false);

  const handleClick = useCallback((onHiddenPageActivated) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 500) { // 500ms threshold for "quick" clicks
      setClicks(prevClicks => {
        const newClicks = prevClicks + 1;
        if (newClicks >= 5 && !showHiddenPage) {
          setShowHiddenPage(true);
          onHiddenPageActivated();
        }
        return newClicks;
      });
    } else {
      setClicks(1);
    }
    setLastClickTime(currentTime);
  }, [lastClickTime, showHiddenPage]);

  return (
    <ClickContext.Provider value={{ showHiddenPage, handleClick }}>
      {children}
    </ClickContext.Provider>
  );
};