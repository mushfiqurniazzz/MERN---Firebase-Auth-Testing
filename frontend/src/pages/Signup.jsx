//importing components, function and libraries
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import styles from "../styles/Signup.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import OAuth from "../components/OAuth";
function Signup() {
  //defining states to use in send request and update with Signup functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const history = useHistory();

  //Signup function with axios
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        email,
        password
      });
      console.log(response.data);
      setError(false);
      setIsSignedUp(true);
    } catch (error) {
      console.log("Signup failed:", error);
      setError(true);
    }
  };
  //if user have alredy sign up or created account sucessfully redirect to login
  useEffect(() => {
    if (isSignedUp) {
      history.push("/login");
    }
  }, [isSignedUp, history]);

  return (
    <>
      {/* used module css that is why it has module extention with bootstrap*/}

      <div className={"card"} id={styles.card}>
        <div className={"card-body"}>
          <h2>Signup</h2>
          <hr />
          <form onSubmit={handleSignup}>
            <div>
              <label>Email : </label>
              {/* used input componenet */}
              <Input
                type={"email"}
                name="email"
                placeholder={"Enter Email :"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password : </label>
              {/* used input componenet */}
              <Input
                type={"password"}
                name="password"
                placeholder={"Enter Password :"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* used the  button componenet with bootstrap success class or the green color*/}
            <div id={styles.button_div}>
              <Button className={"btn btn-outline-success"} type="submit">
                Signup
              </Button>
              <OAuth />
              {/* used the button componenet with bootstrap danger class or red color*/}
              <Button className={"btn btn-outline-danger"}>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
//exporting the function componenet to be used in the app.jsx
export default Signup;
