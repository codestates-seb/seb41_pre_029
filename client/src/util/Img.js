import LogoSrc from "../assets/signup.jpg";
import styled from "styled-components";
import confetti from "https://cdn.skypack.dev/canvas-confetti";
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
  const doItNow = (evt, hard) => {
    lastX = evt.clientX;
    const particleCount = hard ? r(10, 10) : r(2, 15);
    confetti({
      particleCount,
      angle: r(500, 90 * 30),
      spread: r(10, 100),
      origin: {
        x: evt.clientX / window.innerWidth,
        y: evt.clientY / window.innerHeight,
      },
    });
  };
  const doIt = (evt) => {
    doItNow(evt, false);
  };

  const doItHard = (evt) => {
    doItNow(evt, true);
  };

  let lastX = 30;
  const butt = document.querySelector("div");
  const img = document.querySelector("div");
  butt.addEventListener("mousemove", doIt);
  butt.addEventListener("PlayStateChange ", doIt);
  img.addEventListener("loadend ", doItHard);
  img.addEventListener("load ", doItHard);

  function r(mi, ma) {
    return parseInt(Math.random() * (ma - mi) + mi);
  }

  return (
    <Div className="con02_event">
      <Imgs className="chatbox" src={LogoSrc} />
    </Div>
  );
};
export default Img;
