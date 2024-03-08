import { useEffect, useContext } from "react";
import UserContext from "../../context/User/UserContext";

const Signout = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const logoutUser = () => {
      if (userContext !== null) userContext.logoutUser();
    }
    logoutUser();
  }, [userContext]);

  return <div>Signing you out...</div>;
};

export default Signout;