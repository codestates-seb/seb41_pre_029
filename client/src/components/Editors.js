import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const Container = styled.div`
  .edit {
    display: inline-block;
    padding: 10px;
    margin: -1px 0 0;
    height: 200px;
    width: ${(props) => props.width};
    line-height: 1.3;
  }
`;
const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

function Editor({ set, get }) {
  const handleChange = (content, delta, source, editor) => {
    // console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    // setValue(editor.getHTML());
    set(content);

    // set(editor.getHTML());
  };

  return (
    <Container>
      <ReactQuill
        className="edit"
        theme="snow"
        modules={modules}
        formats={formats}
        value={get}
        onChange={handleChange}
      />
    </Container>
  );
}

export default Editor;
