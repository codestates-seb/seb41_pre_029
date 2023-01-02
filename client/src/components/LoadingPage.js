import styled from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";

const LoadingPage = () => {
  return (
    <Div>
      <FadeLoader color="rgba(242, 165, 74, 1)" height={45} margin={50} />
    </Div>
  );
};
export default LoadingPage;

const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  filter: alpha(opacity=100);
  opacity: alpha * 0.5;
  text-align: center;
`;
