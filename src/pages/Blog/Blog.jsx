import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../ultils/formatDate";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/blog")
      .then((res) => {
        setBlogs(res.data.blog.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {blogs.map((blog) => {
                  return (
                    <div key={blog.id} className="single-blog-post">
                      <h3>{blog.title}</h3>
                      <div className="post-meta">
                        <ul>
                          <li>
                            <i className="fa fa-user" /> Mac Doe
                          </li>
                          <li>
                            <i className="fa fa-clock-o" />{" "}
                            {formatDateTime(blog.created_at).time}
                          </li>
                          <li>
                            <i className="fa fa-calendar" />{" "}
                            {formatDateTime(blog.created_at).date}
                          </li>
                        </ul>
                        <span>
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-half-o" />
                        </span>
                      </div>
                      <a href>
                        <img
                          src={
                            "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
                            blog.image
                          }
                          alt="hình ảnh ở đây"
                        />
                      </a>
                      <p>{blog.description}</p>

                      <Link
                        className="btn btn-primary"
                        to={`/blog/detail/${blog.id}`}
                      >
                        Read More
                      </Link>
                    </div>
                  );
                })}

                <div className="pagination-area">
                  <ul className="pagination">
                    <li>
                      <a href className="active">
                        1
                      </a>
                    </li>
                    <li>
                      <a href>2</a>
                    </li>
                    <li>
                      <a href>3</a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-angle-double-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
