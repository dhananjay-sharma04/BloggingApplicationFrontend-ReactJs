import Base from "../../components/Base";
import { getCurrentUserDetail } from "../../services/AuthenticationSvc";
export const ProfileInfo = () => {
  const user = getCurrentUserDetail()
  return (
    <Base>
      <h3>Welcome to User Profile</h3>
      <h3> Name : {user.name}</h3>
      <h3> Email : {user.email}</h3>
      <h3> About : {user.about}</h3>
    </Base>
  );
};
