import { createBrowserRouter } from "react-router-dom";
import BodyMiddle from "./pages/bodyMain/BodyMiddle";
import NoticeBoard from "./pages/bodyMain/NoticeBoard";
import Layout from "./components/card/Layout";
import EventBoard from "./pages/bodyMain/EventBoard";
import OneOneInquiry from "./pages/bodyMain/OneOneInquiry";
import ProductInquiry from "./pages/bodyMain/ProductInquiry";
import ShoppingSaveRoom from "./pages/bodyMain/ShoppingSaveRoom";
import MyPage from "./pages/bodyMain/MyPage";
import MainLpPage from "./pages/bodyMain/MainLpPage";
import CreateProduct from "./pages/detail/CreateProduct";
import DetailLpPage from "./pages/detail/DetailLpPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BodyMiddle />,
      },
      {
        path: "/noticeBoard",
        element: <NoticeBoard />,
        // children: [  // ex> 게시판 안에 게시글 보게 된다면
        //   {
        //     path: "/detail", // localhost:8080/noticeBoard/detail
        //     element: <NoticeBoardDetail />,
        //   },
        // ],
      },
      {
        path: "/eventBoard",
        element: <EventBoard />,
      },
      {
        path: "/productInquiry",
        element: <ProductInquiry />,
      },
      {
        path: "/oneOneInquiry",
        element: <OneOneInquiry />,
      },
      {
        path: "/shoppingSaveRoom",
        element: <ShoppingSaveRoom />,
      },
      {
        path: "/myPage",
        element: <MyPage />,
      },
      {
        path: "/createProduct",
        element: <CreateProduct />,
      },
      {
        path: "/mainLpPage",
        children: [
          {
            index: true,
            element: <MainLpPage />,
          },
          {
            path: "detailLpPage/:productCode",
            element: <DetailLpPage />,
          },
        ],
      },
    ],
  },
]);
export default router;
