//importing components, function and libraries
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { Link, useHistory } from "react-router-dom";
import OAuth from "../components/OAuth";

//main function or page componenet
function Login() {

  //defining states to use in send request and update with login functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const history = useHistory();
  
  //login function with axios
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password
      });

      // Handle successful login response here
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (response.status === 200) {
        history.push("/");
      }
      // If there was no error, reset the error state
      setError(false);
      setLogin(true);
    } catch (error) {
      // Handle errors here
      console.log("Login failed:", error);
      // Set error state to true
      setError(true);
    }
  };

  // after sucessful login will redirect to todo page
  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  //rendering the web, value is something that access the input field [email is like get it and setEmail is like check changes and send to email same with password]
  return (
    <>
      {/* used module css that is why it has module extention */}

      <div className={styles.body}>
        {/* used bootstrap card componenet with custom css */}
        <div className={"card"} id={styles.card}>
          <div className={"card-body"}>
            <h2>Login</h2>
            <hr />
            <form onSubmit={handleLogin}>
              <div>
                <label>Email : </label>
                {/* custom componenet input field */}
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
                {/* custom componenet input field */}
                <Input
                  type={"password"}
                  name="password"
                  placeholder={"Enter Password :"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* custom componenet button with bootstrap sucess or green button*/}
              <div id={styles.button_div}>
                <Button
                  id={styles.button}
                  className={"btn btn-outline-success"}
                  type="submit"
                >
                  Login
                </Button>
                <OAuth />
                {/* redirects to signup if user doesn't have account with bootstrap danger or red button*/}
                <Button className={"btn btn-outline-danger"}>
                  <Link to="/signup">Signup</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

//exporting the function
export default Login;
