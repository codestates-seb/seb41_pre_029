import styled from "styled-components";

const GreyBox = ({ title, ...props }) => {

  return (
    <GreyBoxContainer {...props}>
      <div className="title_wrapper">
        <h2 className="title">{title}</h2>
      </div>
      <div className="content_wrapper">
        <div className="content">{props.content || null}</div>
      </div>
    </GreyBoxContainer>
  );
};

export default GreyBox;

const GreyBoxContainer = styled.div`
  height: ${(props) => props.height || "90px"};
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;


background-color: transparent;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  display: flex;
  flex-direction: column;

  & .title_wrapper {
    background: #f8f9f9;
  }
  & .title {
    color: #525960;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    padding: 12px 15px;
  }

  & .content_wrapper {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 15px;
    font-size: 13px;
    text-align: left;
    color:${(props)=>props.color|| "#000"};
    cursor: pointer;
  }
`;
