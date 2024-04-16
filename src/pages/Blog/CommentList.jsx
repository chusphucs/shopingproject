import { formatDateTime } from "../../ultils/formatDate";

export default function CommentList({ listcomment, handleSetReplyComment }) {
  const handleReply = (comment) => {
    handleSetReplyComment(comment);
  };

  return (
    <div>
      <div class="response-area">
        <h2>{listcomment.length} RESPONSES</h2>
        <ul class="media-list">
          {listcomment.length > 0 &&
            listcomment.map((comment, i) => {
              if (comment.id_comment == 0) {
                return (
                  <div key={i}>
                    <li className="media">
                      <a className="pull-left" href="/">
                        <img
                          className="media-object"
                          src={
                            "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
                            comment.image_user
                          }
                          alt="logo"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {comment.name_user}
                          </li>
                          <li>
                            <i className="fa fa-clock-o" />
                            {formatDateTime(comment.created_at).time}
                          </li>
                          <li>
                            <i className="fa fa-calendar" />
                            {formatDateTime(comment.created_at).date}
                          </li>
                        </ul>
                        <p>{comment.comment}</p>
                        <a
                          className="btn btn-primary"
                          onClick={() => handleReply(comment)}
                          href
                        >
                          <i className="fa fa-reply" />
                          Replay
                        </a>
                      </div>
                    </li>
                    {listcomment.map((_comment, j) => {
                      if (comment.id == _comment.id_comment) {
                        return (
                          <li key={j} index={j} className="media second-media">
                            <a className="pull-left" href="/">
                              <img
                                className="media-object"
                                src={
                                  "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
                                  _comment.image_user
                                }
                                alt="logo"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </a>
                            <div className="media-body">
                              <ul className="sinlge-post-meta">
                                <li>
                                  <i className="fa fa-user" />
                                  {_comment.name_user}
                                </li>
                                <li>
                                  <i className="fa fa-clock-o" />
                                  {formatDateTime(_comment.created_at).time}
                                </li>
                                <li>
                                  <i className="fa fa-calendar" />
                                  {formatDateTime(_comment.created_at).date}
                                </li>
                              </ul>
                              <p>{_comment.comment}</p>
                              <a
                                className="btn btn-primary"
                                onClick={() => handleReply(_comment)}
                                href
                              >
                                <i className="fa fa-reply" />
                                Replay
                              </a>
                            </div>
                          </li>
                        );
                      }
                    })}
                  </div>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
}
