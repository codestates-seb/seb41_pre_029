import parse from "html-react-parser";

const Parser = ({ html }) => {
  // console.log(parse(html));
  return parse(html);
};
export default Parser;
