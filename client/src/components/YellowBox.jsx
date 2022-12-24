import styled from "styled-components";

const YellowBox = ()=>{
  return (
  <YellowBoxContainer>
    <Title>
    The Overflow Blog
    </Title>
    <Content>
    <li>
      <div>✎</div>
      <div>The complete guide to protecting your APIs with OAuth2 (part 1)</div>
    </li> 
    <li>
      <div>✎</div>
      <div>
        The three top-paying tech roles in 2022 and the skills you need to land them
        sponsored post
      </div>
    </li>
    </Content>
    <Title>
    Featured on Meta
    </Title>
     <Content>
    <li>
      <div>🔖</div>
      <div>
        Navigation and UI research starting soon
      </div>
    </li> 
    <li>
      <div>❄️</div>
      <div>
        Temporary policy: ChatGPT is banned
      </div>
    </li>
       <li>
      <div>🍓</div>
      <div>
        2022 Community Moderator Election Results - now with two more mods!
      </div>
    </li>
       <li>
      <div>🍎</div>
      <div>
        I'm standing down as a moderator
      </div>
    </li>
    </Content>
     <Title>
    Hot Meta Posts
    </Title>
     <Content>
    <li>
      <div>7</div>
      <div>
        Spam versus unsolicited self-promotion, and when to use the spam flag (or not)
      </div>
    </li>
    </Content>
  </YellowBoxContainer>
  )
}

export default YellowBox;

const YellowBoxContainer = styled.div`
  width:300px;

  background-color:#fdf7e2;

  box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-left: 1px solid #FDEBAA;
    border-right: 1px solid #FDEBAA;
  border-radius:3px;
`

const Title = styled.div`
  width:270px;

  padding: 10px 15px;
  font-size : 12px;
  font-weight: bold;
  line-height: 16px;
  color : #525960;
  background-color: #fbf3d5;
  border-top:1px solid #FDEBAA;
  border-bottom:1px solid #FDEBAA;

`

const Content = styled.ol`
  margin-top:12px;
  margin-bottom: 15px;
  /* padding: 0 16px; */
  width:300px;
  display: flex;
  flex-direction:column;

  > li{
    font-size : 13px;
    line-height: 17px;
    margin:10px 0;
    overflow-wrap: break-word;
    padding: 0 10px;
    display: flex;
    cursor: pointer;

    color:#3b4045;
    

    > div:first-child {
      margin-left: 7px;
      margin-right: 10px;
      font-weight: bold;
      font-size: 17px;
    }
  }
`