import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Authentication from "./pages/Authentication";
import SignUpContainer from "./components/SignUp";
import SignInContainer from "./components/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./pages/Blog";
import NewBlog from "./pages/NewBlog";
import { GlobalProvider } from "./Context/GlobalContext.tsx";

function Router() {
  return (
    <GlobalProvider>
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
          <Route path="/new-story" element={<NewBlog />} />
          <Route path="/:blogid" element={<Blog />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </GlobalProvider>
  );
}

export default Router;
