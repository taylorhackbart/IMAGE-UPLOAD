import React, { useState } from "react";
import { FormBtn, TextArea } from "../../components/Form";
import API from "../../utils/API";
import "./home.css";

function HomePage() {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };



  return (
    <div className="container">
      <h2 className="homepage-text">WELCOME!  <a href="/photos"> Click</a> to upload photos
   
    </h2>
    </div>
  );
}
export default HomePage;
