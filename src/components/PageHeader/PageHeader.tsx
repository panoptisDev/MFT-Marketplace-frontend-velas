import { Link } from "react-router-dom";
import "./styles.css";

const PageHeader = ({ pageHeader }: any) => {
  let pathName = window.location.pathname.split("/")[1];

  return (
    <div className="page-header">
      <h1>{pageHeader}</h1>
      <div className="page-header-trace">
        {window.location.pathname ? (
          <div>
            <Link to="/">Home </Link> / <span> {pathName}</span>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default PageHeader;
