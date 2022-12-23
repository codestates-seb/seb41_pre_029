import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

const Edit = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    padding: 10px;
    margin: -1px 0 0;
    height: 200px;
    width: ${(props) => props.width};
    line-height: 1.3;
  }
`;
const Editor = ({ onChange, data }) => {
  return (
    <Edit>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const content = editor.getData();
          console.log({ event });
          onChange(content);
        }}
        onBlur={(event, editor) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus.', editor);
        }}
      />
    </Edit>
  );
};

export default Editor;
