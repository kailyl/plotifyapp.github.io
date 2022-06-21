import { useEffect, useState } from "react";
import {isMobile} from 'react-device-detect';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if(isMobile) {
    useEffect(() => {
      const setFromEvent = (e) => setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      window.addEventListener("touchmove", setFromEvent);
      window.addEventListener("touchstart", setFromEvent);
      window.addEventListener("touchend", setFromEvent);
  
      return () => {
        window.removeEventListener("touchstart", setFromEvent);
        window.removeEventListener("touchmove", setFromEvent);
        window.removeEventListener("touchend", setFromEvent);
      };
    }, []);
  } else {
    useEffect(() => {
      const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", setFromEvent);
  
      return () => {
        window.removeEventListener("mousemove", setFromEvent);
      };
    }, []);
  }
  
  return position;
};