//this is a simple 404 page with some custom styling
import Button from "../components/Button";
import styles from "../styles/P404.module.css";
import { Link } from "react-router-dom";

//declaring the 404page function componenet
function P404() {
  return (
    <>
      <h1 className={styles.h1}>Error 404 page not found</h1>
      <Button className={"btn btn-outline-success"}>
        <Link to="/signup"><a>Go to Signup</a></Link>
      </Button>
      <Button className={"btn btn-outline-success"}>
        <Link to="/login"><a>Go to Login</a></Link>
      </Button>
    </>
  );
}
//exporting the 404 page
export default P404;
