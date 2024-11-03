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
import CreateProduct from "./pages/bodyMain/CreateProduct";
import DetailLpPage from "./pages/detail/DetailLpPage";
import OneOneInquiryWriting from "./pages/bodyMain/OneOneInquiryWriting";
import DetailOneOnePage from "./pages/detail/DetailOneOnePage";
import NoticeBoardWriting from "./pages/bodyMain/NoticeBoardWriting";
import DetailNoticBorad from "./pages/detail/DetailNoticBorad";
import CreateOrder from "./pages/bodyMain/CreateOrder";

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
        children: [
          {
            index: true,
            element: <NoticeBoard />,
          },
          {
            path: "noticeBoardWriting",
            element: <NoticeBoardWriting />,
          },
          {
            paht: "detailNoticBorad/:noticBoradCode",
            element: <DetailNoticBorad />,
          },
        ],
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
        children: [
          {
            index: true,
            element: <OneOneInquiry />,
          },
          {
            path: "oneOneInquiryWriting",
            element: <OneOneInquiryWriting />,
          },
          {
            path: "detailOneOnePage/:OneOneCode",
            element: <DetailOneOnePage />,
          },
        ],
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
      {
        path: "/createOrder",
        element: <CreateOrder />,
      },
    ],
  },
]);
export default router;
