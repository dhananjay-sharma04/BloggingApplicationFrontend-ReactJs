import { Link, useLocation } from "react-router-dom";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/ApiUrlConstant";
import { commentList, saveComment } from "../services/CommentSvc";
import { toast } from "react-toastify";
import { isLoggedIn } from "../services/AuthenticationSvc";

const PostPage = () => {
  const post = useLocation().state;
  const [comments, setComments] = useState([]);
  const [errors, setError] = useState({});
  const [comment, setComment] = useState({
    content: "",
  });

  useEffect(() => {
    commentList(post?.id)
      .then((response) => {
        if (response.status === "OK") {
          setComments(response?.data?.comments);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [comment]);

  const handleChange = (event, property) => {
    setComment({ ...comment, [property]: event.target.value });
  };

  const resetComment = () => {
    setComment({
      content: "",
    });
  };

  const createComment = (event) => {
    event.preventDefault();

    saveComment(comment, post?.id)
      .then((response) => {
        if (response.status === "OK") {
          toast.success(response.message);
          resetComment();
        } else if (response.status === "BAD_REQUEST") {
          toast.warning(response.message);
          //handle error to show form
          setError({ ...response?.data?.error });
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to={"/"}>Home</Link>
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3">
              <CardBody>
                <CardText>
                  Posted By <b>{post?.user?.name}</b> on{" "}
                  <b>{new Date(post?.lastModifiedDate).toLocaleString()}</b>
                </CardText>
                <CardText>
                  <span className="text-muted">
                    category : <b>{post.category.catgTitle}</b>
                  </span>
                </CardText>
                <div
                  className="divider"
                  style={{ width: "100", height: "1px", background: "#e2e2e2" }}
                ></div>
                <CardText className="mt-3">
                  <h3>{post?.title}</h3>
                </CardText>
                {post?.imageName && (
                  <div className="image-container conatiner mt-3">
                    <img
                      className="image-fluid"
                      style={{ maxWidth: "50%" }}
                      src={BASE_URL + "posts/image/" + post?.imageName}
                      alt=""
                    />
                  </div>
                )}
                <CardText
                  dangerouslySetInnerHTML={{
                    __html: post?.content,
                  }}
                  className="mt-4"
                ></CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ({comments ? comments.length : 0})</h3>
            {isLoggedIn() && (
              <Card className="mt-4 border-0">
                <CardBody>
                  <Label for="content">Comment</Label>
                  <Input
                    type="textarea"
                    id="content"
                    value={comment.content}
                    onChange={(e) => handleChange(e, "content")}
                    invalid={errors?.content ? true : false}
                    placeholder="Enter your comment here"
                  />
                  <FormFeedback>{errors?.content}</FormFeedback>
                  <Button
                    className="mt-2"
                    color="primary"
                    onClick={createComment}
                  >
                    Submit
                  </Button>
                </CardBody>
              </Card>
            )}
            {comments &&
              comments.reverse().map((c, index) => (
                <Card className="mt-2 border-0" key={index}>
                  <CardBody>
                    <CardText>
                      <b>{c.user.name}</b>
                    </CardText>
                    <CardText>
                      <i>{c.content}</i>
                    </CardText>
                  </CardBody>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
