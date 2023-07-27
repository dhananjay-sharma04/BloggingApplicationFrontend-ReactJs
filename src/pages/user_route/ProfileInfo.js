import Base from "../../components/Base";
import { BASE_URL } from "../../constant/ApiUrlConstant";
import { getCurrentUserDetail } from "../../services/AuthenticationSvc";
export const ProfileInfo = () => {
  const user = getCurrentUserDetail()
  return (
    <Base>
      <h3>Welcome to User Profile</h3>
      {user?.imageName && (
                  <div className="image-container conatiner mt-3">
                    <img
                      className="image-fluid"
                      style={{ maxWidth: "25%" }}
                      src={BASE_URL + "users/image/" + user?.imageName}
                      alt=""
                    />
                  </div>
                )}
      <h3> Name : {user.name}</h3>
      <h3> Email : {user.email}</h3>
      <h3> About : {user.about}</h3>
    </Base>
  );
};
