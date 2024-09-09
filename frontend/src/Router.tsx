import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import SignUpContainer from "./components/SignUp";
import SignInContainer from "./components/SignIn";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Authentication child={<SignUpContainer />} />}
        />
        <Route
          path="/signin"
          element={<Authentication child={<SignInContainer />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
