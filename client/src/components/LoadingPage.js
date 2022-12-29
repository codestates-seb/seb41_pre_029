import styled from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";

const LoadingPage = () => {
  return (
    <Div>
      <SyncLoader color="#e59537" size={20} speedMultiplier={0.6} margin={15} />
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
