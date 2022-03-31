import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect, useSelector } from "react-redux";
import { getDashboardData } from "../src/redux/action/dashboard";
import { moodChange, pageTitle } from "../src/redux/action/utils";
import ProtectedRoute from "./ProtectedRoute";

const Menu = dynamic(() => import("../src/uena/home/Menu"), {
  ssr: false,
});
const DailyTarget = dynamic(() => import("../src/uena/home/DailyTarget"), {
  ssr: false,
});
const OrderChart = dynamic(() => import("../src/uena/home/OrderChart"), {
  ssr: false,
});
const CustomersChart = dynamic(
  () => import("../src/uena/home/CustomersChart"),
  {
    ssr: false,
  }
);
const CustomerMap1 = dynamic(() => import("../src/uena/home/CustomerMap1"), {
  ssr: false,
});
const CustomerMap2 = dynamic(() => import("../src/uena/home/CustomerMap2"), {
  ssr: false,
});
const CustomerMap3 = dynamic(() => import("../src/uena/home/CustomerMap3"), {
  ssr: false,
});
const Index = ({
  pageTitle,
  getDashboardData,
  dailyTargetChart,
  orderChart,
  customerChart,
  menuChart,
  customerMapChart,
  trendingMenu,
  orderRequest,
}) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    moodChange();

    pageTitle("Dashboard");
    getDashboardData();
  }, []);
  const [refresh, setRefresh] = useState(false);
  const [numberOfShow, setNumberOfShow] = useState(2);
  const onClick = () => {
    setRefresh(true);
    setTimeout(() => {
      setNumberOfShow(numberOfShow + 1);
      setRefresh(false);
    }, 1000);
  };
  return (
      <ProtectedRoute>
    
      </ProtectedRoute>
  );
};

const mapSateToProps = (state) => ({
  dailyTargetChart: state.dashboard.dailyTargetChart,
  orderChart: state.dashboard.orderChart,
  customerChart: state.dashboard.customerChart,
  menuChart: state.dashboard.menuChart,
  customerMapChart: state.dashboard.customerMapChart,
  trendingMenu: state.dashboard.trendingMenu,
  orderRequest: state.dashboard.orderRequest,
});

export default connect(mapSateToProps, { pageTitle, getDashboardData })(Index);
