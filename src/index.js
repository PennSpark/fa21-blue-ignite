import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Canvas from "./Canvas";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

var destination = document.querySelector("#list-container");

ReactDOM.render(
  <div>
    <Canvas />
  </div>,
  destination
);
