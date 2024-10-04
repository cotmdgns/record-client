import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/member/Login";
import Signup from "./pages/member/Signup";
import BodyMiddle from "./pages/bodyMain/BodyMiddle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <BodyMiddle />,
      },
    ],
  },
]);
export default router;
