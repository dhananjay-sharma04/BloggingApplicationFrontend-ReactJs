import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { categoryList } from "../services/cateSvc";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { savePost } from "../services/postSvc";

const AddPost = () => {
  const editor = useRef(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    catTitle: "",
  });

  const resetPost = () => {
    setPost({
      title: "",
      content: "",
      catTitle: "",
    });
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryList()
      .then((response) => {
        if (response.status === "OK") {
          setCategories(response.data.categories);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleChange = (event, property) => {
    setPost({ ...post, [property]: event.target.value });
  };

  const createPost = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    savePost(post)
      .then((response) => {
        if (response.status === "OK") {
          toast.success(response.message);
          resetPost();
        } else if (response.status === "BAD_REQUEST") {
          toast.warning(response.message);
          //handle error to show form
          // setError({ ...response?.data?.error });
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="wrapper">
      <Row className="mt-4">
        <Col sm={{ size: 12, offset: 0.5 }}>
          <Card className="shadow-sm">
            <CardHeader className="text-center">
              <h3>What's going in your mind?</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={createPost}>
                {JSON.stringify(post)}
                {/* Post title */}
                <div className="my-3">
                  <Label for="title">Post Title</Label>
                  <Input
                    type="text"
                    id="title"
                    onChange={(e) => handleChange(e, "title")}
                    placeholder="Enter Here"
                    className="rounded-0"
                  />
                </div>

                {/* Post content */}
                <div className="my-3">
                  <Label>Post Content</Label>
                  <JoditEditor
                    ref={editor}
                    height="1000px"
                    value={post.content}
                    onChange={(newContent) =>
                      setPost({ ...post, content: newContent })
                    }
                  />
                </div>

                {/* Post Category */}
                <div className="my-3">
                  <Label for="catTitle">Post Category</Label>
                  <Input
                    type="select"
                    id="catTitle"
                    className="rounded-0"
                    onChange={(e) => handleChange(e, "catTitle")}
                    defaultValue={""}
                  >
                    <option disabled value={""}>
                      ----select category----
                    </option>
                    {categories.map((category) => (
                      <option value={category.catgTitle} key={category.id}>
                        {category.catgTitle}
                      </option>
                    ))}
                  </Input>
                </div>

                {/* Button */}
                <Container className="text-center">
                  <Button type="submit" color="primary" className="rounded-0">
                    Create Post
                  </Button>
                  <Button
                    onClick={resetPost}
                    type="reset"
                    color="danger"
                    className="rounded-0 ms-2"
                  >
                    Reset Content
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddPost;
