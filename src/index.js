<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var destination = document.querySelector("#quote-container");
function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url,false );
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
function parseResponse(response) {
    return JSON.parse(response);
}
var response = parseResponse(httpGet("https://api.quotable.io/random"));
var quote = response.content;
var author = response.author;

ReactDOM.render(
    <div>
        <p>{quote}</p>
        <p>- {author}</p>
    </div>,
    destination
=======
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
>>>>>>> main
);
