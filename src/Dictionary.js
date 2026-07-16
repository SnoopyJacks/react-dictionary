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

  const search = useCallback(async (rawKeyword) => {
    const normalizedKeyword = rawKeyword.trim();

    if (!normalizedKeyword) {
      setError("Enter a word to search.");
      setStatus("error");
      return;
    }

    activeRequest.current?.abort();

    const controller = new AbortController();
    activeRequest.current = controller;

    setStatus("loading");
    setError("");
    setResults(null);
    setPhotos([]);
    setSearchedKeyword(normalizedKeyword);

    const encodedKeyword = encodeURIComponent(normalizedKeyword);

    const dictionaryUrl =
      `${API_BASE_URL}/dictionary/v1/define` +
      `?word=${encodedKeyword}&key=${API_KEY}`;

    const imagesUrl =
      `${API_BASE_URL}/images/v1/search` +
      `?query=${encodedKeyword}&key=${API_KEY}`;

    try {
      const [dictionaryResponse, imageResponse] = await Promise.allSettled([
        fetchJson(dictionaryUrl, controller.signal),
        fetchJson(imagesUrl, controller.signal),
      ]);

      if (dictionaryResponse.status === "rejected") {
        throw dictionaryResponse.reason;
      }

      setResults(dictionaryResponse.value);

      setPhotos(
        imageResponse.status === "fulfilled"
          ? (imagesResponse.value.photos ?? [])
          : [],
      );

      setStatus("success");

      document.title = `${normalizedKeyword} definition | Online Dictionary`;
    } catch (requestError) {
      if (requestError.name === "AbortError") {
        return;
      }

      setError(
        "We could not find that word right now. Check the spelling and try again.",
      );

      setStatus("error");
    }
  }, []);

  useEffect(() => {
    search(defaultKeyword);

    return () => {
      activeRequest.current?.abort();
    };
  }, [defaultKeyword, search]);

  function handleSubmit(event) {
    event.preventDefault();
    search(keyword);
  }

  return (
    <div className="Dictionary">
      <section className="Dictionary-search" aria-labelledby="dictionary-title">
        <h1 id="dictionary-title">Look up an English word</h1>

        <form
          className="Dictionary-form"
          role="search"
          onSubmit={handleSubmit}
          aria-describedby="dictionary-hint dictionary-status"
        >
          <label htmlFor="dictionary-search">Word to look up</label>

          <div className="Dictionary-controls">
            <input
              id="dictionary-search"
              name="keyword"
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="For example, computer"
              autoComplete="off"
              enterKeyHint="search"
              required
            />

            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Searching…" : "Search"}
            </button>
          </div>
        </form>

        <p id="dictionary-hint" className="hint">
          Try “computer,” “happiness,” or another English word.
        </p>

        <div
          id="dictionary-status"
          className={`Dictionary-status ${
            status === "error" ? "Dictionary-status--error" : ""
          }`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "loading" && `Searching for “${keyword.trim()}”…`}

          {status === "error" && error}
        </div>
      </section>

      {status === "success" && (
        <>
          <Results results={results} />

          <Photos photos={photos} keyword={searchedKeyword} />
        </>
      )}
    </div>
  );
}
