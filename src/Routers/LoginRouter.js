import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "../Controllers/auth";
import ResetPass from "../Controllers/resetPass";
const LoginRouter = () => {
  return (
    <Router>

      <Route exact path='/' component={Auth}/>
      <Route exact path='/87545856985854145256' component={ResetPass}/>
    </Router>
  );
};

export default LoginRouter;
