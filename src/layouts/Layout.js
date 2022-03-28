import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {checkAuthenticated, load_user, login} from "../redux/action/auth";
import Footer from "./Footer";
import ChatBox from "./header/chatbox/ChatBox";
import Header from "./header/Header";
import NavHeader from "./header/NavHeader";
import PreLoader from "./PreLoader";
import Sidebar from "./Sidebar";
const Layout = ({ children, login, user }) => {
  const [height, setHeight] = useState();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setHeight(window.screen.height - 100);
  
    load_user();
    setActive(document.querySelectorAll(".metismenu a") ? true : false);
    
  }, [user]);

  return (
    <Fragment>
      {!active ? (
        <PreLoader />
      ) : (
        <div id="main-wrapper" className="show">
          <NavHeader />
          <ChatBox />
          <Header />
          <Sidebar />
          <div className="content-body" style={{ minHeight: height }}>
            <div className="container-fluid">{children}</div>
          </div>
          {/* <Demos />
          <Settings /> */}
          <Footer />
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.users,
});

export default connect(mapStateToProps, { checkAuthenticated, login, load_user })(Layout);
