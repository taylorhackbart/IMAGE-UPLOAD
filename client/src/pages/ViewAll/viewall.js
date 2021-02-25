import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./viewall.css";

function ViewAll() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({});

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = () => {
    API.getExamples().then((res) => {
      const data = res.data;
      setState(res.data);
      setLoading(false);
    });
  };
  return (
    <div>
      {loading == false && (
        <div>
          <div className="manage-container container">
            <h3 className="view-each-library">Click on a photo below to view each library:</h3>
            <div className="manage-row, row">
              {state.map((x) => (
                <div className="col-md-3">
                  {x.images.length > 0 && (
                    <Link to={"/view/" + x._id} key={x._id}>
                      <img className="images-viewall" src={x.images[0].src} alt="..."/>
                      {console.log(x.images)}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ViewAll;
