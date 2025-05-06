
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Diary from "./pages/Diary";
import SignUp from "./pages/SignUp";
import ExcitingZone from './pages/ExcitingZone';
import GuideZone from './pages/GuideZone';
import StadiumDetail from "./components/StadiumDetail";
import ReviewWrite from './pages/ReviewWrite';
import ReviewView from './pages/ReviewView';
import Profile from './pages/Profile';
import StadiumTip from "./pages/StadiumTip";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="diary" element={<Diary />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="excitingzone" element={<ExcitingZone />} />
          <Route path="/guidezone" element={<GuideZone />} />
          <Route path="/stadium/:id" element={<StadiumDetail />} />
          <Route path="review/write" element={<ReviewWrite />} />
          <Route path="review/view" element={<ReviewView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stadium/tip" element={<StadiumTip />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
