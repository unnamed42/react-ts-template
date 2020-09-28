import React, { FC, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const Div: FC = () => <div></div>;

export const Routes: FC = () => <Router>
  <Suspense fallback={<Div />} />
  <Switch>
    <Route exact path="/" component={Div} />
  </Switch>
</Router>;
