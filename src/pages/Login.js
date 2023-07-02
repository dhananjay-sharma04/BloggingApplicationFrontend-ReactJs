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
import { toast } from "react-toastify";
import { login } from "../services/userSvc";
import { doLogin } from "../services/AuthenticationSvc";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState({});

  const resetData = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clearing error
    setError({});

    //call api to the server
    login(data)
      .then((response) => {
        if (response.status === "OK") {

          //save the data to localstorage
          doLogin(response.data.login, () => {
            //redirect to user dashboard page
            navigate("/user/dashboard")
          })

          toast.success(response.message);
          resetData()
        } else if (response.status === "BAD_REQUEST") {
          toast.warning(response.message);
          //handle error to show form
          setError({ ...response?.data?.error });
          console.log(errors)
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
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
                <h3>Login Here !!!</h3>
              </CardHeader>
              <CardBody>
                {/* creating Form */}
                <Form onSubmit={submitForm}>
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

                  <Container className="text-center">
                    <Button color="dark">Login</Button>
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

export default Login;
