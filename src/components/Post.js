import { Link } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";

const Post = ({ post }) => {
  return (
    <Card className="mt-3">
      <CardBody className="border-0 shadow-sm mt-3">
        <h1>{post?.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post?.content.substring(0, 50) + ".....",
          }}
        ></CardText>
        <div>
          <Link
            className="btn btn-secondary"
            to={"/posts/" + post.id}
            state={post}
          >
            Read More
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
