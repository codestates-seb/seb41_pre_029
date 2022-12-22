import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width || "Auto"};
  height: 33px;
  outline: none;
  margin: 0 3px;
  padding: 8px 10.4px;
  border-radius: 5px;
  border: 1px solid #39739d;
  color: ${(props) => props.color || "#FFFFFF"};
  background-color: ${(props) => props.background || "#0A95FF"};
`;

const Button = ({ buttonName, link, ...rest }) => {
  return (
    // <Link to={link}>
    <StyledButton {...rest}>{buttonName}</StyledButton>
    // </Link>
  );
};

export default Button;
