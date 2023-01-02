import LogoSrc from "../assets/signup.jpg";
import styled from "styled-components";
import React, { useState } from "react";
import JSConfetti from "js-confetti";
const jsConfetti = new JSConfetti();

const Div = styled.div`
  background-color: #d7d9db47;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 15s;

  .chatbox {
    animation: motion 3s;
    transform-origin: 80% 100%;
  }

  @keyframes motion {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;
const Imgs = styled.img`
  width: 500px; ;
`;
const Img = () => {
  jsConfetti.addConfetti({
    emojis: ["🌈", "💥", "✨", "💫", "🌸", "🌟", "🌼"],
    emojiSize: 60,
    confettiNumber: 70,
  });

  return (
    <Div className="con02_event">
      <Imgs className="chatbox" src={LogoSrc} />
    </Div>
  );
};
export default Img;
