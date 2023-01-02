import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Pagination = ({ total, limit, page, setPage }) => {
  
const numPages = Math.ceil(total / limit);
const  navigate  = useNavigate();

  return (
    <>
      <Nav>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
                         onClick={() => {
                 setPage(i + 1)
                navigate(`/?page=${i}&size=${limit}`)
                  }}
            
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
      </Nav>
    </>
  );
};

export default Pagination;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  width: 24px;
  height: 27px;

  border: 1px solid rgba(103, 112, 121, 0.7);

  border-radius: 3px;

  padding: 0 8px;
  font-size: 13px;
  margin: 0;
  background: white;
  color: #3b4045;

  &:hover {
    background: rgba(103, 112, 121, 0.2);
    cursor: pointer;
  }

  &[aria-current] {
    background: #f48225;
    color: white;
    border: 1px solid transparent;
    cursor: revert;
    transform: revert;
  }
`;
