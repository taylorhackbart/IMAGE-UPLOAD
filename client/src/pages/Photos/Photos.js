import React, { useCallback, useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useParams, useHistory } from "react-router-dom";
import Dropzone from "../../components/FileInput/Dropzone";
import ImageList from "../../components/FileInput/ImageList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import cuid from "cuid";
import API from "../../utils/API";
import update from "immutability-helper";

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    // console.log("true")
    return true;
  }
  // console.log("false")
  return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

function Photos() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [photoArr, setPhotoArr] = useState({})
  const history = useHistory();
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const onDrop = useCallback((acceptedFiles) => {
    // Loop through accepted files
    console.log(acceptedFiles);
    try {
      acceptedFiles.map((file) => {
        // Initialize FileReader browser API
        const reader = new FileReader();
        // onload callback gets called after the reader reads the file data
        reader.onload = function (e) {
          // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
          setPhotos((prevState) => [
            ...prevState,
            { id: cuid(), src: e.target.result },
          ]);
        };
        // Read the file as Data URL (since we accept only photos)
        reader.readAsDataURL(file);
        // console.log(reader.readAsDataURL(file))
        return file;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSend = () => {
    console.log(photos, photoArr);
    setPhotoArr({ ...photoArr, images: photos });
    setDone(true);
  };

  const onSubmit = async () => {
    await API.saveExample(photoArr).then((res) => {
      setPhotoArr({ ...photoArr, images: photos });
      console.log(res);
      const id = res.data._id
      history.push("/view/" + id);
    });
  };

  const moveImage = (dragIndex, hoverIndex) => {
    console.log("click");
    const draggedImage = photos[dragIndex];
    setPhotos(
      update(photos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };
  const removeItem = (id) => {
    setPhotos(
      update(photos, {
        $splice: [[id, 1]],
      })
    );
  };
  console.log(photos);
  return (
    <>
      {loading === false && (
        <>
          <main className="App">
            <h1 className="text-center">Drag and Drop </h1>

            <Dropzone onDrop={onDrop} accept={"image/*"} />
            {photos && photos.length > 0 && (
              <h3 className="text-center">
                Drag the photos to change positions
              </h3>
            )}
            <DndProvider backend={backendForDND}>
              <ImageList
                images={photos}
                moveImage={moveImage}
                removeItem={removeItem}
              />
            </DndProvider>
            {done === false && (
              <>
                <button onClick={onSend}> Save </button>
                <button onClick={onSubmit} style={{ display: "none" }}>
                  {" "}
                  Submit{" "}
                </button>
              </>
            )}
            {done === true && (
              <>
                <button onClick={onSend} style={{ display: "none" }}>
                  {" "}
                  Save{" "}
                </button>
                <button onClick={onSubmit}> Submit </button>
              </>
            )}
          </main>
        </>
      )}
    </>
  );
}

export default Photos;
