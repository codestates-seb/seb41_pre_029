import React, { useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import styled from "styled-components";

const Container = styled.div `
  height: auto;
  .w-md-editor {
  overflow: initial;
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: #ffffff;

  > .w-md-editor-content {
    min-height: 400px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow: initial;
    background-color: #ffffff;

    > .w-md-editor-input {
      color: black;
      background-color: #ffffff;
      overflow: initial;
      width: 100%;
      min-height: 200px;
      height: auto;

      > .w-md-editor-text {
        min-height: 200px;
        height: auto;
        line-height: 30px;
      }

    }
    > .w-md-editor-preview  {
      color: black;
      background-color: #ffffff;
      width: 100%;
      position: relative;
  
      overflow: initial;
      min-height: 200px;
      height: auto;
      box-shadow: none;
      border-top: 1px solid rgba(0, 0, 0, 0.2);

        > .wmde-markdown-color {
        color: black;
        background-color: #ffffff;
        overflow: initial;
        height: auto;
        border: none;
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
  useEffect(() => {
    onChange(value)
  }, [value])
  return (
    <Container>
      <MDEditor
        style={{
          backgroundColor: 'white',
      }}
        height={'auto'}
        minHeight={700}
        
        value={value}
        onChange={
          (e) => {
            changeValue(e)
          }
        }
      />
    </Container>
  );
}

export default CEditor;