import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/userSvc";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [image, setImage] = useState(null);

  const [errors, setError] = useState({});

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
    setImage(null)
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    console.log(image)
  };

  const submitForm = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clearing error
    setError({});

    //call api to the server
    signUp(data, image)
      .then((response) => {
        if (response.status === "OK") {
          toast.success(response.message);
          resetData();
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

  //handle changes
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline>
              <CardHeader className="text-center">
                <h3>Fill Information to Register!!!</h3>
              </CardHeader>
              <CardBody>
                {/* creating Form */}

                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={errors?.name ? true : false}
                    />
                    <FormFeedback>{errors?.name}</FormFeedback>
                  </FormGroup>

                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={errors?.email ? true : false}
                    />
                    <FormFeedback>{errors?.email}</FormFeedback>
                  </FormGroup>

                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      valid={data.password}
                      invalid={errors?.password ? true : false}
                    />
                    <FormFeedback>{errors?.password}</FormFeedback>
                  </FormGroup>

                  {/* image field */}
                  <FormGroup>
                      <Label for="image">Profile picture</Label>
                      <Input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                      />
                  </FormGroup>

                  {/* About field */}
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter about"
                      id="about"
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={errors?.about ? true : false}
                      style={{ height: "250px" }}
                    />
                    <FormFeedback>{errors?.about}</FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="dark">Register</Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      className="ms-2"
                      type="reset"
                    >
                      Clear
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
