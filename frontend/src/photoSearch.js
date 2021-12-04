import React, { useState } from "react";
import { createApi } from "unsplash-js";

const unsplash = new createApi({
    accessKey: "eWlwUu5dZFK9R4eM-afu5PoMEp3-RAIOJTyc__SvfDs",
  });

export default function SearchPhotos() {
    const [pics, setPics] = useState([]);
    
    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.photos.getRandom({
            count: 1
        }).then(results => {
          setPics(results.response);});
      };
  
    return (
    <>
    <form className="form" onSubmit={searchPhotos}> 
        <button type="submit" className="button">
          Generate Image
        </button>
    </form>
    { pics.map((pic) => <div className="card" key={pic.id}>
      <img
        className="card--image"
        alt={pic.alt_description}
        src={pic.urls.full}
        width="75%"
        height="75%"
      ></img>
    </div>)}
    </>
  );
}