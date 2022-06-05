import React, { useState } from "react";
import "./styles.css";

const Title = ({ title }: any) => {
  const [first, setFirst] = useState(0);

  //   useEffect(() => {
  //     setInterval(function () {
  //       setFirst(first + 1);
  //     }, 1000);
  //     return () => {};
  //   }, []);

  return (
    <div className="title">
      <h1>{title}</h1>
      <div className="heading-line">
        <span
          style={{
            width: "11px",
            height: "11px",
            position: "absolute",
            backgroundColor: "#5142FC",
            borderRadius: "50%",
            top: "-4px",
            transform: "translateX(-50%)",
            left: "50%",
            // right: first,
          }}
        ></span>
      </div>
    </div>
  );
};

export default Title;
