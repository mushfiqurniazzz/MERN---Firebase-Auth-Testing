import Button from "./Button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../FireBase";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default function OAuth() {
  const auth = getAuth(app);
  const history = useHistory();
  const location = useLocation();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "http://localhost:3000/auth/google",
        {
          email: resultsFromGoogle.user.email
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (res.status === 200) {
        // Check the current route and redirect accordingly
        if (location.pathname === "/signup") {
          history.push("/login");
        } else if (location.pathname === "/login") {
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      className={"btn btn-outline-warning"}
      onClick={handleGoogleClick}
    >
      Continue with Google
    </Button>
  );
}

OAuth.propTypes = {
  history: PropTypes.object.isRequired
};
