import  { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import './Dictionary.css';

const API_BASE_URL = "https://api.shecodes.io";

const API_KEY =
  process.env.REACT_APP_SHECODES_API_KEY || "7da4d2833b785tc382cf9d899bo46033";

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status},`);
  }

  return response.json();
}

export default function Dictionary({ defaultKeyword = "computer "}) {
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState("idle");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const activeRequest = useRef(null);

  function handleDictionaryResponse(response) {
    setResults(response.data);
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
          <label htmlFor="dictionary-search>Word to look up"></label>
          <input 
          id="dictionary-search"
          name="keyword"
          type="search" 
          onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
          <button type="submit">Search</button>
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