import styled from "styled-components";

const Input = ({ label, value, name, ...rest }) => {
  return (
    <Wrap>
      <Label>{label}</Label>
      <InputEdit type="text" {...rest} value={value} name={name} />
    </Wrap>
  );
};
export default Input;

const Wrap = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  padding: 2px;
`;
const InputEdit = styled.input`
  padding: 0.6em 0.7em;
  width: 50%;
  display: block;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
  font-size: 13px;
  font-family: inherit;
`;
const Label = styled.div`
  padding: 5px;
  display: block;
  font-family: inherit;
  font-weight: 600;
`;
