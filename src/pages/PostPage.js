import { Link, useLocation, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { useEffect } from "react";

const PostPage = () => {
  const postId = useParams().id;
  const post = useLocation().state;

  useEffect(() => {
    //load postById from database
    console.log(post);
  }, []);

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
                    <span className="text-muted">category : <b>{post.category.catgTitle}</b></span>
                </CardText>
                <div className="divider" style={{width:'100',height:'1px',background:'#e2e2e2'}}></div>
                <CardText className="mt-3">
                  <h3>{post?.title}</h3>
                </CardText>
                <div className="image-container conatiner mt-3">
                  <img
                    className="image-fluid"
                    style={{ maxWidth: "50%" }}
                    src={"https://source.unsplash.com/user/c_v_r/1900×800"}
                    alt=""
                  />
                </div>
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
            <Col md={{
                size:9,
                offset:1
            }}>
                <h3>Comments</h3>

                {
                    post?.comments && post?.comments.map((c)=>{
                        console.log(c);
                        <h3>{c.content}</h3>
                    })
                }
            </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
