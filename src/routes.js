// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/setting";
import ITDashboard from "layouts/itdashboard";
import accounts from "layouts/accounts";
import evaluation from "layouts/evaluation";
import empevaluation from "layouts/employeeeval";
import departments from "layouts/departments";
import emp from "layouts/emptraining";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import FormsList from "components/Forms/FormsList";


// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoIosBrowsers } from "react-icons/io";
import { CgOrganisation } from "react-icons/cg";
import { IoIosContacts } from "react-icons/io";
import { IoIosKeypad } from "react-icons/io";

// Define routes for each role
const hrmoRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Training",
    key: "Trainings",
    route: "/Trainings",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "setting",
    route: "/setting",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
];

const itRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "it-dashboard",
    route: "/it-dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: ITDashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Forms",
    key: "forms",
    route: "/forms",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: FormsList,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Evaluation",
    key: "evaluation",
    route: "/evaluation",
    icon: <IoIosBrowsers size="15px" color="inherit" />,
    component: evaluation,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    route: "/departments",
    icon: <IoIosKeypad size="15px" color="inherit" />,
    component: departments,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "User Accounts",
    key: "useraccounts",
    route: "/useraccounts",
    icon: <IoIosContacts size="15px" color="inherit" />,
    component: accounts,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "setting",
    route: "/setting",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
];

const employeeRoutes = [
  {
    type: "collapse",
    name: "Training",
    key: "Training",
    route: "/Training",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: emp,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Evaluation",
    key: "empevaluation",
    route: "/empevaluation",
    icon: <IoIosBrowsers size="15px" color="inherit" />,
    component: empevaluation,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "setting",
    route: "/setting",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
];

// Authentication routes (visible to all)
const authRoutes = [
  {
    type: "component",
    name: "SignIn",
    key: "sign-in",
    route: "/sign-in",
    component: SignIn,
    noCollapse: true,
    hidden: true, // Not shown in sidenav
  },
  {
    type: "component",
    name: "SignUp",
    key: "sign-up",
    route: "/sign-up",
    component: SignUp,
    noCollapse: true,
    hidden: true, // Not shown in sidenav
  },
];

// Function to get role-based routes
const getRoutesByRole = (role) => {
  console.log('Getting routes for role:', role);
  let roleRoutes;
  switch (role) {
    case "HRMO":
      roleRoutes = [...hrmoRoutes, ...authRoutes];
      break;
    case "IT":
      roleRoutes = [...itRoutes, ...authRoutes];
      break;
    case "Employee":
      roleRoutes = [...employeeRoutes, ...authRoutes];
      break;
    default:
      roleRoutes = authRoutes;
  }
  console.log('Routes for role:', roleRoutes);
  return roleRoutes;
};

// Export the function to get role-based routes
export { getRoutesByRole };

// Default export for backward compatibility (can be removed later)
const routes = [...authRoutes];

import EvaluationList from './components/Evaluations/EvaluationList';
import DepartmentList from './components/Departments/DepartmentList';

routes.push(
  {
    path: '/evaluations',
    component: EvaluationList,
    name: 'Evaluations',
  },
  {
    path: '/departments',
    component: DepartmentList,
    name: 'Departments',
  },
  // ... add other routes as needed
);

export default routes;