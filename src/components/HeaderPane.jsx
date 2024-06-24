import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContextProvider";
// import { contentSenderObject } from "../utils/ContentSenderObject";
// import consts from '../Constants';

function HeaderPane() {
  const { owner, currentActiveUser, userDetails } = useContext(UsersContext);

  // useEffect(() => {
  // new contentSenderObject(
  //   consts.ActiveUser,
  //   "",
  //   currentActiveUser,
  // ).sendContent();
  // },[currentActiveUser])
  // console.log("owner: ", owner);

  return (
    <div className="header-container">
      <div className="my-user-name">{owner.USER.name}</div>
      <div className="current-username">
        {currentActiveUser !== null && userDetails[currentActiveUser].name}
      </div>
    </div>
  );
}

export default HeaderPane;
