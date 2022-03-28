import Head from "next/head";
import "nouislider/distribute/nouislider.css";
import { useEffect, useState } from "react";
// redux
import { Provider } from "react-redux";
import SimpleReactLightbox from "simple-react-lightbox";
import { appName } from "../config/appConfig";
// Css style
import "../public/styles/chart.css";
import "../public/styles/colors.css";
import "../public/styles/custom.css";
import "../public/styles/print.css";
import "../public/styles/style.css";
import "../public/styles/wizard.css";
import Layout from "../src/layouts/Layout";
// action
import { bodyArt, resizeWindow } from "../src/redux/action/utils";
import store from "../src/redux/store";

function MyApp({ Component, pageProps }) {

 const [doc, setDoc] = useState();
  const [pages, setPages] = useState();
  useEffect(() => {
	  
	 
    bodyArt();
    setDoc(document);
    setPages(window.location.pathname);
    resizeWindow();
    setPages(window.location.pathname);
    window.addEventListener("resize", resizeWindow);
	
    return () => window.removeEventListener("resize", resizeWindow);
	 
  }, [pages]);

  return (
    <Provider store={store}>
      <SimpleReactLightbox>
        <Head>
          <title>{appName}</title>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon.png"
          />
        </Head>
          <Component {...pageProps} />
      </SimpleReactLightbox>
    </Provider>
  );
}

export default MyApp;
