import { useNavigate, useParams } from "react-router-dom";
import {
  useAddNewCommentMutation,
  useDeletePostMutation,
  useGetPostInfoQuery,
} from "../../Services/FetchData";
import { BiArrowBack } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";

interface PostProps {}

const Post: React.FC<PostProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetPostInfoQuery(id || "");
  const [deletePost] = useDeletePostMutation();
  const [commentPost] = useAddNewCommentMutation();

  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, data?.comments]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCommentValue(e.target.value);
  const handleDelete = () => {
    deletePost(id || "");
    navigate("/");
  };

  const handleComment = () => {
    commentValue &&
      commentPost({
        postId: Number(id) || 0,
        body: commentValue,
      });
    setCommentValue("");
  };

  return (
    <main className="Post">
      <div className="PostPost">
        <span onClick={() => navigate("/")} className="subPostTitle back">
          <BiArrowBack /> Go back
        </span>
        <header className="PostHeader">
          <h1>Post Info:</h1>
          <input
            value={commentValue}
            onChange={handleChangeTitle}
            type="text"
            placeholder="Comment goes here..."
            className="Comment_input"
          />
          <div className="buttons_wrapper">
            <button className="button" onClick={() => navigate("edit")}>
              Edit
            </button>
            <button className="button" onClick={handleComment}>
              Comment
            </button>
            <button className="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </header>
        {data && (
          <>
            <span className="subPostTitle">Title:</span>
            <h2 className="PostTitle">{data.title}</h2>
            <span className="subPostTitle body">Body:</span>
            <h2 className="PostTitle body_content">{data.body}</h2>
            <section className="Comments">
              <h2 className="subPostTitle">Comments:</h2>
              <ul className="Comment_list">
                {data.comments.map((comment) => (
                  <li className="Comment">
                    <span className="Comment_usename">@unknown</span> <br />
                    {comment.body}
                  </li>
                ))}
                {!data.comments.length && <h1>No comments yet.</h1>}
                <div ref={scrollRef}></div>
              </ul>
            </section>
          </>
        )}
        {isLoading && <h1 className="PostTitle">Loading...</h1>}
      </div>
    </main>
  );
};

export default Post;
