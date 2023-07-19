import { Container } from "reactstrap";
import Base from "../../components/Base";
import AddPost from "../../components/addPost";
const UserDashboard = () => {
  return (
    <Base>
      <Container>
        <AddPost />
      </Container>
    </Base>
  );
};

export default UserDashboard;
