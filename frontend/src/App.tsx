import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import Modal from "./pages/Modal";
import { Provider } from "react-redux";
import store from "./stored/stores";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MyBlogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/blog/:id/edit" element={<Modal />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
