import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as ErrorIcon } from "../assets/error.svg";

const ErrorPage = () => {
  return (
    <Wrap>
      <Div>
        <ErrorIcon />
      </Div>
      <Div>
        <Div>
          <Title>Page not found</Title>
        </Div>
        <Div>
          <Msg>We're sorry, we couldn't find the page you requested.</Msg>
        </Div>
        <Div>
          <List>
            Try <Link>searching for similar questions</Link>
          </List>
          <List>
            Browse our <Link>recent questions</Link>
          </List>
          <List>
            Browse our <Link>popular tags</Link>
          </List>
          <List>
            If you feel something is missing that should be here,
            <Link> contact us.</Link>
          </List>
        </Div>
      </Div>
    </Wrap>
  );
};
export default ErrorPage;

const Wrap = styled.div`
  display: flex;
  background-color: #f1f2f3;
  vertical-align: baseline;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: left;
  letter-spacing: normal;
  -webkit-font-smoothing: antialiased;
  font-weight: 700px;
`;
const Div = styled.div`
  margin-right: 38px;
  position: relative;
  .icon {
    position: relative;
    bottom: 55px;
  }
`;

const Title = styled.h1`
  font-size: 28px;

  line-height: 35px;
  margin: 0px 0px 4px;
`;
const Msg = styled.p`
  clear: both;
  font-size: 19px;
  margin: 0px 0px 19px;
  line-height: 25px;
`;
const List = styled.p`
  font-size: 15px;
  line-height: 19.6px;
  margin: 0px 0px 15px;
`;
