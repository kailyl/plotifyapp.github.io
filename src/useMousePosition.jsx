import { useEffect, useState } from "react";
import {isMobile} from 'react-device-detect';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // if(isMobile) {
    useEffect(() => {
      const setFromEvent = (e) => {
        console.log("HELLO")
        console.log(e.touches[0].clientX)
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
      window.addEventListener("touchstart", setFromEvent);
  
      return () => {
        window.removeEventListener("touchstart", setFromEvent);
      };
    }, []);
  // } else {
  //   useEffect(() => {
  //     const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
  //     window.addEventListener("mousemove", setFromEvent);
  
  //     return () => {
  //       window.removeEventListener("mousemove", setFromEvent);
  //     };
  //   }, []);
  // }
  
  return position;
};