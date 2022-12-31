import styled from "styled-components";

const ThemeWrapper = styled.div`
  img {
    width: 105px;
    height: 68px;
    margin: 0 8px 0 8px;
    border: 1px solid hsl(210deg 8% 90%);
    border-radius: 5px;
    margin-bottom: 4px;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05);
  }
  display: flex;
  justify-content: space-between;
  padding: 24px;
  border: 1px solid hsl(210deg 8% 90%);
  align-items: center;
  border-radius: 5px;

  font-family: "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberation Sans",
    sans-serif;
  > .theme-name {
    font-weight: bold;
  }
  > .pictureWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    > label {
      display: flex;
      margin-left: 16px;
      :hover {
        cursor: pointer;
      }
      > input {
        margin-right: 0;
      }
      > .radio-picture {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
    }
  }
`;
const Theme = () => {
  return (
    <ThemeWrapper>
      <div className="theme-name">
        <span>Theme</span>
      </div>
      <div className="pictureWrapper">
        <label>
          <input type={"radio"} name="theme" value={"Light"} />
          <div className="radio-picture">
            <img src="https://cdn.sstatic.net/Img/preferences/theme-light.svg?v=2d017a78abab" />
            <div>Light</div>
          </div>
        </label>

        <label>
          <input type={"radio"} name="theme" value={"System setting"} />
          <div className="radio-picture">
            <img src="https://cdn.sstatic.net/Img/preferences/theme-system@2x.png?v=358fa5ee5f7b" />
            <div>System setting</div>
          </div>
        </label>

        <label>
          <input type={"radio"} name="theme" value={"Dark"} />
          <div className="radio-picture">
            <img src="https://cdn.sstatic.net/Img/preferences/theme-dark.svg?v=9a46fd615a91" />
            <div>Dark</div>
          </div>
        </label>

        {/* <input type={'radio'}></input>
        <img src="https://cdn.sstatic.net/Img/preferences/theme-light.svg?v=2d017a78abab" />
        <div>Light</div>
      </div>
      <div className="pictureWrapper">
        <input type={'radio'}></input>
        <img src="https://cdn.sstatic.net/Img/preferences/theme-system@2x.png?v=358fa5ee5f7b" />
        <div>System setting</div>
      </div>
      <div className="pictureWrapper">
        <input type={'radio'}></input>
        <img src="https://cdn.sstatic.net/Img/preferences/theme-dark.svg?v=9a46fd615a91"/>
        <div>Dark</div> */}
      </div>
    </ThemeWrapper>
  );
};

export default Theme;
