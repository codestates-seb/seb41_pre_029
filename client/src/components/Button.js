import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = ({ buttonName, link, ...rest }) => {
  const navigate = useNavigate();
  return (
    <StyledButton {...rest} onClick={() => navigate(link)}>
      {buttonName}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  width: ${(props) => props.width || "Auto"};
  height: 33px;
  outline: none;
  margin: 0 3px;
  padding: 8px 10.4px;
  border-radius: 3px;
  border: 1px solid transparent;
  color: ${(props) => props.color || "#FFFFFF"};
  background-color: ${(props) => props.background || "#0A95FF"};

  cursor: pointer;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 2px 0px 0px inset;
`;
