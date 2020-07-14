/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Overview from "views/Overview.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import Services from "views/Services.js";
import APIInfo from "views/APIInfo.js";
import CustomVisualization from "views/CustomVisualization";

var routes = [
  {
    path: "/overview",
    name: "Overview",
    icon: "nc-icon nc-bank",
    component: Overview,
    layout: "/dashboard",
  },
  {
    path: "/services",
    name: "Services status",
    icon: "nc-icon nc-tile-56",
    component: Services,
    layout: "/dashboard",
  },
  {
    path: "/api_info",
    name: "API info",
    icon: "nc-icon nc-sound-wave",
    component: APIInfo,
    layout: "/dashboard",
  },
  {
    path: "/custom_visualization",
    name: "Custom Visualization",
    icon: "nc-icon nc-caps-small",
    component: CustomVisualization,
    layout: "/dashboard",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/dashboard",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/dashboard",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/dashboard",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/dashboard",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/dashboard",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/dashboard",
  },
];
export default routes;
