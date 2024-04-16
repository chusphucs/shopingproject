import { useState } from "react";
import axios from "axios";

export default function Comment({
  idBlog,
  getCmt,
  replyComment,
  handleSetReplyComment,
}) {
  const [commentContent, setCommentContent] = useState("");
  const userData = JSON.parse(localStorage.getItem("auth"));

  const handlePostComment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ban chua dang nhap");
      return;
    }
    if (!commentContent) {
      alert("Binh luan trong");
      return;
    }
    const newComment = {
      id_blog: idBlog,
      id_user: userData.id,
      name_user: userData.name,
      id_comment: replyComment ? replyComment.id : 0,
      comment: commentContent,
      image_user: userData.avatar,
    };
    axios
      .post(
        `http://localhost/laravel8/laravel8/public/api/blog/comment/${idBlog}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getCmt(response.data.data);
        setCommentContent("");
        handleSetReplyComment(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a reply</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                name="message"
                rows={11}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handlePostComment}>
                Post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
