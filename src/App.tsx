import { Routes, Route, useParams } from "react-router-dom";
import "./Style/Style.css";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import Post from "./Pages/Post/Post";
import PostEdit from "./Pages/Post/PostEdit";
import PostAdd from "./Pages/Post/PostAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add" element={<PostAdd />} />
          <Route path="post/:id/" element={<Post />} />
          <Route path="post/:id/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
