import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickContext } from '../contexts/ClickContext';

const ClickHandler = ({ children }) => {
  const navigate = useNavigate();
  const { showHiddenPage, handleClick } = useClickContext();

  useEffect(() => {
    if (showHiddenPage) {
      navigate('/hidden');
    }
  }, [showHiddenPage, navigate]);

  return <div onClick={handleClick}>{children}</div>;
};

export default ClickHandler;
