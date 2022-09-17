import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../../Services/FetchData";

interface PostEditProps {}

const PostEdit: FC<PostEditProps> = () => {
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [addPost, { isSuccess, isError }] = useAddNewPostMutation();
  const isValid: boolean = titleValue !== "" && bodyValue !== "";
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);
  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBodyValue(e.target.value);
  const handleAdd = () => {
    if (isValid) {
      addPost({
        title: titleValue,
        body: bodyValue,
      })
      navigate("/")
      isError && alert("error");
    }
  };

  return (
    <main className="Post">
      <div className="PostPost">
        <header className="PostHeader">
          <h1>Add post:</h1>
          <div className="buttons_wrapper">
            <button onClick={handleAdd} className="button">
              Add
            </button>
            <button onClick={() => navigate(`/`)} className="button">
              Dismiss
            </button>
          </div>
        </header>
        <span className="subPostTitle">Title:</span>
        <input
          onChange={handleChangeTitle}
          value={titleValue}
          className="PostTitle input"
        />
        <span className="subPostTitle body">Body:</span>
        <textarea
          rows={5}
          onChange={handleChangeBody}
          value={bodyValue}
          className="PostTitle input"
        />
      </div>
    </main>
  );
};

export default PostEdit;
