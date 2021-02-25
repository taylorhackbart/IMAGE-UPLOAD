import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import API from "../../utils/API";
import { useParams } from "react-router-dom";


function View() {
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    loadPhotos();
  }, []);
  const imageRef = useRef();

  const loadPhotos= async () => {
    await API.getExample(params.id)
      .then((resp) => {
        setPhoto(resp.data.images);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const checkNumber = (number) => {
    if (number > photo.length - 1) {
      return 0;
    }
    if (number < 0) {
      return photo.length - 1;
    }
    return number;
  };

  const nextPhoto = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPhoto = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="card-img-top">
          <div className="center-me">
            <div className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active ">
                  {loading === false && (
                    <img
                      src={photo[index].src}
                      className="d-block w-100 large-photo"
                      alt="..."
                      ref={imageRef}
                    />
                  )}
                </div>
              </div>

              <a
                className="carousel-control-prev"
                role="button"
                data-bs-slide="prev"
                onClick={prevPhoto}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden"></span>
              </a>
              <a
                className="carousel-control-next"
                role="button"
                data-bs-slide="next"
                onClick={nextPhoto}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden"></span>
              </a>
            </div>
          </div>
        </div>
          </div>
          <div className="mapped-row">
          {photo.length} photos in this collection
          </div>
        </div>
  );
}

export default View;
