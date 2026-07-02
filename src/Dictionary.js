import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import './Dictionary.css';


export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  function handleImagesResponse(response) {
    setPhotos(response.data.photos);
  }

function search() {
  let apiKey = "7da4d2833b785tc382cf9d899bo46033";
  let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
  axios.get(apiUrl).then(handleDictionaryResponse);

  let imagesApiKey = "7da4d2833b785tc382cf9d899bo46033";
  let imagesApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${imagesApiKey}`;
  axios.get(imagesApiUrl).then(handleImagesResponse);
}

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }
  
  if (loaded) {
  return (
    <div className="Dictionary">
      <section>
        <h1>What word do you want to look up?</h1>
        <form onSubmit={handleSubmit}>
          <input type="search" onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
        </form>
        <div className="hint">
          <p>Hint: Try searching for words like "computer" or "happiness"</p>
        </div>
      </section>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
} else {
  load();
  return "Loading..."
}
}