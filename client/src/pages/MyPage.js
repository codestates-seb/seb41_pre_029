import styled from "styled-components";
import { useState } from "react";

import EditProfile from "../components/EditProfile";
import DeleteProfile from "../components/DeleteProfile";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const PageWrapper = styled.div `
  display: flex;
  margin: 0 320.5px 0 320.5px;
`
const ContentsWrapper = styled.div `
  width: 100%;
  max-width: 1100px;
  padding: 24px 24px 24px 24px;
  // 유저 프로필 부분
  > .content-userBar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > img {
      border-radius: 5px;
      width: 128px;
      height: 128px;
      margin: 8px;
    }
    > .content-userBar--flexItems {
      > .username {
        font-family: "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
        font-size: 34px;
        margin-left: 5px;
        margin-bottom: 12px;
      }
    }
  }

  // nav, 인터페이스 부분
  > .content-body {
    display: flex;
    height: 100%;
    > nav {
      margin-right: 32px;
      > ul {
        top: 64px;
        font-family: "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
        font-size: 13px;
        > .title {
          padding: 6px 48px 6px 12px;
          display: block;
          align-items: center;
          border-radius: 15px;
          color: #232629;
          font-size: 11px;
          font-weight: bold;
          margin-bottom: 2px;
          margin-top: 30px;
        }
        > .button {
          padding: 6px 48px 6px 12px;
          display: block;
          align-items: center;
          border-radius: 15px;
          color: #525960;
          font-weight: 600;
          :hover {
            background-color: #e3e6e8;
          }
        }
        > .clicked {
          background-color: #da680b;
          color: #ffffff;
        }
        > .active {
          background-color: #da680b;
          color: #ffffff;
          :hover {
            background-color: #da680b;
          }
        }
      }
    }
  }
`

const MyPage = () => {
  const [ activeEdit, setActiveEdit ] = useState(false);
  const [ activeDel, setActiveDel ] = useState(false);
  const [ page, setPage ] = useState('nothing');

  const handleClickEdit = () => {
    if(!activeEdit) {
      setActiveEdit(true);
      setActiveDel(false);
      setPage('edit');
    }
  }
  const handleClickDel = () => {
    if(!activeDel) {
      setActiveDel(true);
      setActiveEdit(false);
      setPage('delete');
    }
  }

  return (
    <>
    <PageWrapper>
      <Nav />
      <ContentsWrapper>
        <div className="content-userBar">
          <img src="https://lh3.googleusercontent.com/a/AATXAJzbbtvOgySkjfLmq_p28xd-Cr4PnWtRXCDJpVx4=k-s256"></img>
          <div className="content-userBar--flexItems">
            <div className="username">{'userName'}</div>
            <ul className="icons">
              <li></li>
            </ul>
          </div>
        </div>
        <div className="content-body">
          <nav>
            <ul>
              <li className="title">
                <span>PERSONAL INFORMATION</span>
              </li>
              <li className={`button ${activeEdit ? 'active' : ''}`} onClick={handleClickEdit}>
                <span>Edit profile</span>
              </li>
              <li className={`button ${activeDel ? 'active' : ''}`} onClick={handleClickDel}>
                <span>Delete profile</span>
              </li>
              <li className="title">
                <span>EMAIL SETTINGS</span>
              </li>
              <li className="button">
                <span>Edit email settings</span>
              </li>
              <li className="button">
                <span>Tag watching & ignoring</span>
              </li>
              <li className="button">
                <span>Community digests</span>
              </li>
              <li className="button">
                <span>Question subscriptions</span>
              </li>
              <li className="title">
                <span>SITE SETTINGS</span>
              </li>
              <li className="button">
                <span>Preferences</span>
              </li>
              <li className="button">
                <span>Flair</span>
              </li>
              <li className="button">
                <span>Hide communities</span>
              </li>
              <li className="title">
                <span>ACCESS</span>
              </li>
              <li className="button">
                <span>Your Collectives</span>
              </li>
              <li className="button">
                <span>Your logins</span>
              </li>
              <li className="title">
                <span>API</span>
              </li>
              <li className="button">
                <span>Authorized applications</span>
              </li>
            </ul>
          </nav>
          <div className="content-wrapper">
            <div className="content-about"></div>
            <div className="content-interface">
              {page === 'nothing' && <div></div>}
              {page === 'edit' && <EditProfile />}
              {page === 'delete' && <DeleteProfile />}
            </div>
          </div>
        </div>
      </ContentsWrapper>
    </PageWrapper>
      <Footer />
    </>
  );
};

export default MyPage;
