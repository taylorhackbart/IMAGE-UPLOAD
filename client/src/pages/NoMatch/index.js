import React from "react";
//Allows users to know they are still on the site, but the html route they are looking for cannot be found
function NoMatch() {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        {" "}
        404 PAGE NOT FOUND{" "}
      </h1>
    </>
  );
}
export default NoMatch;
