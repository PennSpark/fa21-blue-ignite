import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Canvas from "./Canvas";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import reportWebVitals from './reportWebVitals';
import ReactPlayer from "react-player";

var list_select = document.querySelector("#list-container");
var quote_select = document.querySelector("#quote-container");

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url,false );
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function parseResponse(response) {
    return JSON.parse(response);
}

/* code for random quotes */
var response = parseResponse(httpGet("https://api.quotable.io/random"));
var quote = response.content;
var author = response.author;

/* code for random videos */
function getRandomVid() {
  var count = 10;
  var API_KEY = 'AIzaSyDWTu1jFVq0sA8mqCTzrSKVb6FszG8ixrI';

  // make a random search key, characters or digits
  var random_choice = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for ( var i = 0; i < 3; i++ ) {
    random_choice += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // create a search query for the api
  var api_data = 'https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&maxResults=' + count + '&part=snippet&type=video&q=' + random_choice

  // fetch that response
  var video_response = parseResponse(httpGet(api_data));

  // create a list of all of the video ids that were pulled
  var id_list = [];
  var items = video_response['items']

  for ( var i = 0; i < count; i++ ) {
    id_list.push(items[i]['id']['videoId']);
  }

  return id_list[Math.floor(Math.random() * id_list.length)];
}

ReactDOM.render(
    <div>
        <p>{quote}</p>
        <p>- {author}</p>
        <ReactPlayer url={'https://www.youtube.com/watch?v=' + getRandomVid()} muted={true} playing={true} loop={true}/>
        <Canvas />
    </div>,
    quote_select
);