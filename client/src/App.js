import "./App.css";
import React, { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MyPage from "./pages/MyPage";
import QuestionPage from "./pages/QuestionPage";
import SignupPage from "./pages/SignupPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import EditAnswerPage from "./pages/EditAnswerPage";

/* dark mode */

function App() {
  const [searchData, setSearchData] = useState("");
  const [find, setFind] = useState("");
  const [eventKey, setEventKey] = useState("");
  return (
    <CookiesProvider>
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Header
            search={setSearchData}
            find={setFind}
            eventKey={setEventKey}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage data={searchData} find={find} eventKey={eventKey} />
              }
            />
            <Route path="/addquestionpage" element={<AddQuestionPage />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/logoutpage" element={<LogoutPage />} />
            <Route path="/mypage/:id" element={<MyPage />} />
            <Route path="/questionpage/:id" element={<QuestionPage />} />
            <Route path="/signuppage" element={<SignupPage />} />
            <Route path="/edit/:id" element={<EditQuestionPage />} />
            <Route
              path="/editanswer/:questionid/:answerid"
              element={<EditAnswerPage />}
            />
          </Routes>
        </Router>
      </div>
    </CookiesProvider>
  );
}

export default App;
