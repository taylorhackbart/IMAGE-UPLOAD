import React from "react";
import NavBar from "./components/Nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import { DndProvider } from "react-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

//PUBLIC ROUTES
import HomePage from "./pages/Home/Home.js";
import Photos from "./pages/Photos/Photos.js";
import View from "./pages/Photos/View.js";
import NoMatch from "./pages/NoMatch";

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};
const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;
function App() {
  return (
    <DragDropContext>
      <div className="page-container">
        <DndProvider backend={backendForDND}>
          <BrowserRouter>
            <NavBar />
            <div className="app-background">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/photos" component={Photos} />
                <Route exact path={"/view/:id"} component={View} />
                <Route path="*" component={NoMatch} />
              </Switch>
            </div>
          </BrowserRouter>
        </DndProvider>
      </div>
    </DragDropContext>
  );
}

export default App;
