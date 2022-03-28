import { devName, devWebsite } from "../../config/appConfig";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a href={devWebsite} target="_blank">
            {devName}
          </a>{" "}
          {currentYear}
        </p>
      </div>
    </div>
  );
};

export default Footer;
