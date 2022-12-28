import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MyPage from "./pages/MyPage";
import QuestionPage from "./pages/QuestionPage";
import SignoutPage from "./pages/SignoutPage";
import SignupPage from "./pages/SignupPage";
import EditQuestionPage from "./pages/EditQuestionPage";

import useStore from "./zustand/store.js";
import EditAnswerPage from "./pages/EditAnswerPage";

function App() {
  const [searchData, setSearchData] = useState("");

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL} >
        <Header search={setSearchData} />
        <Routes>
          <Route path="/" element={<MainPage data={searchData} />} />
          <Route path="/addquestionpage" element={<AddQuestionPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/logoutpage" element={<LogoutPage />} />
          <Route path="/mypage/:id" element={<MyPage />} />
          <Route path="/questionpage/:id" element={<QuestionPage />} />
          {/* <Route path="/signoutpage" element={<SignoutPage />} /> */}
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/edit/:id" element={<EditQuestionPage />} />
          <Route
            path="/editanswer/:questionid/:answerid"
            element={<EditAnswerPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
