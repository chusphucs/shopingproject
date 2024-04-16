import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../Blog/CommentList";
import Content from "../../ultils/Content";
import Rate from "./Rate";
import Comment from "../Blog/Comment";

export default function BlogDetail() {
  const [blogDetail, setBlogDetail] = useState({});
  const [blogComment, setBlogComment] = useState([]);
  const [numRate, setNumRate] = useState(0);
  const { id } = useParams();
  const [replyComment, setReplyComment] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/laravel8/laravel8/public/api/blog/detail/${id}`)
      .then((res) => {
        setBlogDetail(res.data.data);
        setBlogComment(res.data.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // lay so luong rating
  const getNumRate = (numrate) => {
    setNumRate(numrate);
  };
  //
  const getCmt = (newComment) => {
    setBlogComment((prev) => {
      return [...prev, newComment];
    });
  };
  const handleSetReplyComment = (replyComment) => {
    setReplyComment(replyComment);
  };
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                  <h3>{blogDetail.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <i className="fa fa-user" /> Mac Doe
                      </li>
                      <li>
                        <i className="fa fa-clock-o" /> 1:33 pm
                      </li>
                      <li>
                        <i className="fa fa-calendar" /> DEC 5, 2013
                      </li>
                    </ul>
                  </div>
                  <a href>
                    <img
                      src={
                        "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
                        blogDetail.image
                      }
                      alt="hinh anh"
                    />
                  </a>
                  <Content content={blogDetail.content} />
                  <div className="pager-area">
                    <ul className="pager pull-right">
                      <li>
                        <a href="/">Pre</a>
                      </li>
                      <li>
                        <a href="/">Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rating-area">
                <ul className="ratings">
                  <li className="rate-this">Rate this item:</li>
                  <li className="color">{numRate}</li>
                  <li>
                    <Rate idBlog={id} setNumRate={getNumRate} />
                  </li>
                </ul>
                <ul className="tag">
                  <li>TAG:</li>
                  <li>
                    <a className="color" href>
                      Pink <span>/</span>
                    </a>
                  </li>
                  <li>
                    <a className="color" href>
                      T-Shirt <span>/</span>
                    </a>
                  </li>
                  <li>
                    <a className="color" href>
                      Girls
                    </a>
                  </li>
                </ul>
              </div>

              <div className="socials-share"></div>
              <CommentList
                listcomment={blogComment}
                handleSetReplyComment={handleSetReplyComment}
              />
              <Comment
                idBlog={id}
                getCmt={getCmt}
                replyComment={replyComment}
                handleSetReplyComment={handleSetReplyComment}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
