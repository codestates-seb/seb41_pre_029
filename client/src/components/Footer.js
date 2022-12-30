import styled from "styled-components";

const Footer = () => {
  return (
    <SiteFooter>
      <FooterContainer>
        <div className="footer-logo">
          <a>
            <svg
              aria-hidden="true"
              className="native svg-icon iconLogoGlyphMd"
              width="32"
              height="37"
              viewBox="0 0 32 37"
            >
              <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
              <path
                d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                fill="#F48024"
              ></path>
            </svg>
          </a>
        </div>
        <nav className="footer-nav">
          <div className="footer-nav--col">
            <h5 className="title">STACK OVERFLOW</h5>
            <ul className="list">
              <li>Questions</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="footer-nav--col">
            <h5 className="title">PRODUCTS</h5>
            <ul className="list">
              <li>Teams</li>
              <li>Advertising</li>
              <li>Collectives</li>
              <li>Talent</li>
            </ul>
          </div>
          <div className="footer-nav--col">
            <h5 className="title">COMPANY</h5>
            <ul className="list">
              <li>About</li>
              <li>Press</li>
              <li>Work Here</li>
              <li>Legal</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
              <li>Cookie Settings</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div className="footer-nav--col">
            <h5 className="title">STACK EXCHANGE NETWORK</h5>
            <ul className="list">
              <li>Technology</li>
              <li>Culture & recreation</li>
              <li>Life & arts</li>
              <li>Science</li>
              <li>Professional</li>
              <li>Business</li>
              <br />
              <li>API</li>
              <li>Data</li>
            </ul>
          </div>
        </nav>
        <div className="footer-copyright">
          <ul className="socialMedia">
            <li>Blog</li>
            <li className="margincls">Facebook</li>
            <li className="margincls">Twitter</li>
            <li className="margincls">LinkdIn</li>
            <li className="margincls">Instagram</li>
          </ul>
          <p>
            Site design / logo © 2022 Stack Exchange Inc; user
            <br /> contributions licensed under
            <span>
              <a>CC BY-SA</a>
            </span>
            .
          </p>
        </div>
      </FooterContainer>
    </SiteFooter>
  );
};

export default Footer;

const SiteFooter = styled.footer`
  width: 100%;
  color: hsl(210deg 8% 60%);
  background-color: hsl(210deg 8% 15%);
`;

const FooterContainer = styled.div`
  max-width: 1264px;
  margin: 0 auto;
  padding: 32px 12px 12px 12px;
  display: flex;
  flex-flow: row wrap;
  font-family: "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberation Sans",
    sans-serif;

  > .footer-logo {
    flex: 0 0 64px;
    margin: -12px 0 32px 0;
  }

  > .footer-nav {
    display: flex;
    flex: 2 1 auto;
    flex-wrap: wrap;
    > .footer-nav--col {
      flex: 1 0 auto;
      padding: 0 12px 24px 0;
      > .title {
        color: hsl(210deg 8% 75%);
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 12px;
      }
      > .list {
        line-height: 17px;
        font-size: 13px;
      }
    }
  }

  > .footer-copyright {
    display: flex;
    flex: 1 1 150px;
    flex-direction: column;
    > .socialMedia {
      display: flex;
      list-style: none;
      font-size: 11px;
      > .margincls {
        margin-left: 12px;
      }
    }
    > p {
      margin-top: auto;
      margin-bottom: 24px;
      font-size: 11px;
    }
  }
`;
