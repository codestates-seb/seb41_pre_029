import "./App.css";
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

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/addquestionpage" element={<AddQuestionPage />} />
          <Route path="/errorpage" element={<ErrorPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/logoutpage" element={<LogoutPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="questionpage" element={<QuestionPage />} />
          <Route path="/signoutpage" element={<SignoutPage />} />
          <Route path="/signuppage" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
