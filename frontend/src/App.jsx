//using the version 5 of react-router-dom
//importing the function componenet and other functions, libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import P404 from "./pages/P404";
//main app function
function App() {
  return (
    // using router to wrap the switch which wraps the route
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* using the 404 page componenet for all the pages a user may search for except the defined ones */}
        <Route path="*" component={P404} />
      </Switch>
    </Router>
  );
}
//exporting the fucntion componenet to the main.jsx for controlling the root id manupulation
export default App;
