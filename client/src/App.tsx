import React from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";

// Layout
import Layout from "./components/Layout";
// Pages
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditAdmin from "./pages/EditAdmin";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "./store";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    private: false,
    admin: false,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
    private: false,
    admin: false,
  },
  {
    path: "/register",
    exact: false,
    component: Register,
    private: false,
    admin: false,
  },
  {
    path: "/add",
    exact: false,
    component: Add,
    private: true,
    admin: false,
  },
  {
    path: "/edit/:id",
    exact: true,
    component: Edit,
    private: true,
    admin: false,
  },
  {
    path: "/edit/admin/:id",
    exact: true,
    component: EditAdmin,
    private: true,
    admin: true,
  },
];

const PrivateRoute = (props: RouteProps) => {
  const {
    userInfo: { _id },
  } = useSelector((state: RootState) => state.user);
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return _id.length !== 0 ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
const AdminRoute = (props: RouteProps) => {
  const {
    userInfo: { role },
  } = useSelector((state: RootState) => state.user);
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return role === "admin" ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => {
          const RouteType = route.admin
            ? AdminRoute
            : route.private
            ? PrivateRoute
            : Route;
          return (
            <RouteType key={index} path={route.path} exact={route.exact}>
              <route.component />
            </RouteType>
          );
        })}
      </Switch>
    </Layout>
  );
};

export default App;
