import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Canvas from "./Canvas";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import reportWebVitals from './reportWebVitals';
import ReactPlayer from "react-player";

var list_select = document.querySelector("#list-container");
var quote_select = document.querySelector("#quote-container");

export function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url,false );
    xmlHttp.send(null);
    return xmlHttp;
}

export function parseResponse(response) {
    return JSON.parse(response);
}

/* code for random quotes */
export function get50RandomQuotes() {
  var quoteList = {};

  for ( var i = 0; i < 50; i++ ) {
    var response = parseResponse(httpGet("https://api.quotable.io/random").responseText);
    var quote = response.content;
    var author = response.author;

    quoteList[author] = quote;
  }

  return quoteList;
}

export function getRandomQuote(quoteList, index) {
  var keys = Object.keys(quoteList); 
  
  var quote = quoteList[keys[ index % 50 ]];
  var author = Object.keys(quoteList).find(key => quoteList[key] === quote);

  return quote + ' -' + author;
}

export function get50RandomPhotos() {
  var photoList = [];

  const url = "https://api.unsplash.com/photos/random/?count=50&client_id=eWlwUu5dZFK9R4eM-afu5PoMEp3-RAIOJTyc__SvfDs";
  var data = JSON.parse(httpGet(url).response);

  for (let i = 0; i < data.length; i++) {
    photoList[i] = data[i].urls.full;
  }

  return photoList;
}

export function getRandomPhoto(photoList, index) {
  return photoList[index % 50];
}

/* code for random videos */
export function getRandomIds() {
  var count = 50;
  var API_KEY = 'AIzaSyA4ENuatedytpap5a-jMwLbeKm9mQCFmuI';

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
  var video_response = parseResponse(httpGet(api_data).responseText);

  // create a list of all of the video ids that were pulled
  var id_list = [];
  var items = video_response['items']

  for ( var i = 0; i < count; i++ ) {
    id_list.push(items[i]['id']['videoId']);
  }

  return id_list;
}

export function getRandomVideo(id_list, index){
  return id_list[index % 50];
}


ReactDOM.render(
    <div>
        <Canvas />
    </div>,
    quote_select
);