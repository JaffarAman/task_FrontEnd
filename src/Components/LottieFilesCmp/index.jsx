import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";

const LottieFilesCmp = ({ animation, style }) => {
  const lottieRef = useRef(null);

  const handleEvent = (e) => {
    if (e === "load") {
      lottieRef.current?.play();
    }
  };
  return (
    <>
      <Player
        autoplay
        loop={true}
        src={animation}
        style={{ height: "300px", width: "300px", ...style }}
        onEvent={handleEvent}
        ref={lottieRef}
      ></Player>
    </>
  );
};

export default LottieFilesCmp;
