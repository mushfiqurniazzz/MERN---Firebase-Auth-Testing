//this is the function that we will be using for firebase authentication, the plan is to make this a button and the email will be send to the database, the recieved email will be saved with a random generated password and that generated password will be hashed and the saved to database all this will be done during sign up and in case of login we will search the provided email in the database and if it's found we will send a authentication token and will be checked each time if the used is elegible to use or not

//importing the important functions, componenet functions and libraries to crate this firebase authentication function
import Button from "./Button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../FireBase";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

//export function called OAuth
export default function OAuth() {
  //using some important libraries for our desired tasks
  const auth = getAuth(app);
  const history = useHistory();
  const location = useLocation();

  //the onclick function which will create a pop up for sign up or sign in
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      //using axios for sending the created account's email
      const res = await axios.post(
        "http://localhost:3000/auth/google",
        {
          email: resultsFromGoogle.user.email
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      //the logic behind this block of if statement code is that if we are in the /signup path we will go to login if the sign up with google with successful and the same would happen in case we are in the login page and after we logged in we will go to the / page with token
      if (res.status === 200) {
        // Check the current route and redirect accordingly
        if (location.pathname === "/signup") {
          history.push("/login");
        } else if (location.pathname === "/login") {
          history.push("/");
        }
      }
    } catch (error) {
      //basic error handling
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
