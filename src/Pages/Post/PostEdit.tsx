import { useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPostMutation,
  useGetPostInfoQuery,
} from "../../Services/FetchData";

interface PostEditProps {}

const PostEdit: FC<PostEditProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPostInfoQuery(id || "");
  const [editPost, { isLoading: isEditing, isError }] = useEditPostMutation();

  const [titleValue, setTitleValue] = useState(data?.title || "");
  const [bodyValue, setBodyValue] = useState(data?.body || "");

  const isValid: boolean = titleValue !== "" && bodyValue !== "";
  
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);
  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBodyValue(e.target.value);

  const handleEdit = () => {
    if (isValid) {
      editPost({
        id: Number(id) || 0,
        post: { title: titleValue, body: bodyValue },
      });
      navigate(-1);
    }
  };
  return (
    <main className="Post">
      <div className="PostPost">
        <header className="PostHeader">
          <h1>Edit post id : {data?.id || "Loading"}</h1>
          <div className="buttons_wrapper">
            <button onClick={handleEdit} className="button">
              Ok
            </button>
            <button onClick={() => navigate(`/post/${id}`)} className="button">
              Dismiss
            </button>
          </div>
        </header>
        {data && (
          <>
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
          </>
        )}
        {isLoading && <h1 className="PostTitle">Loading...</h1>}
      </div>
    </main>
  );
};

export default PostEdit;
