import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export const Timer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval); 
    };
  }, []); 

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Text style={{flexDirection: 'row', alignItems: 'center'}} >{formatTime(timer)}</Text>
  );
}