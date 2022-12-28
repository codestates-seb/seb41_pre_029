import React from "react";
import MDEditor from '@uiw/react-md-editor';
import styled from "styled-components";

const Container = styled.div `
  .w-md-editor {
  overflow: visible;
  display: flex;
  flex-direction: column;
  height: 100%;

  > .w-md-editor-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    > .w-md-editor-input {
      color: black;
      background-color: #ffffff;
      width: 100%;
    }
    > .w-md-editor-preview  {
      color: black;
      background-color: #ffffff;
      width: 100%;
      position: relative;
      border: 1px solid black;

        > .wmde-markdown-color {
        color: black;
        background-color: #ffffff;
        overflow: visible;
      }
    }
  }
}
`

const CEditor = ({onChange, data}) => {
  const [value, setValue] = React.useState(data);

  const changeValue = (e) => {
    setValue(e)
  }
  return (
    <Container>
      <MDEditor
        value={value}
        onChange={
          (e) => {
          changeValue(e)
          onChange(value)
          }
        }
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </Container>
  );
}

export default CEditor;