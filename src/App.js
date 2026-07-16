import { useEffect } from 'react';
import logo from './dictionary.jpg';
import './App.css';
import Dictionary from './Dictionary';

const DEFAULT_TITLE = "Online Dictionary | Definitions, Phonetics, and Synonyms";

const DEFAULT_DESCRIPTION =
  "Search English words to find definitions, phonetic spellings, examples, synonyms, and related images.";

export default function App() {
  useEffect(() => {
    document.title = DEFAULT_TITLE;

    let description = document.querySelector(`meta[name="description"]`);

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
  }, []);

  return (
    <div className="App">
      <a className="skip-link" href="#main-content">Skip to dictionary search
      </a>
      <div className="container">
        <header className="App-header">
          <img 
          src={logo} 
          className="App-logo img-fluid" 
          alt="Dictionary application" 
          width="120" 
          height="106"
          decoding="async"
          />
        <p className="App-title" aria-label="Online Dictionary">
          Online Dictionary
        </p>
        </header>

        <main id="main-content">
          <Dictionary defaultKeyword="computer" />
        </main>

        <footer className="App-footer">
          <p>
          Coded by Justine Ziola · Open-source on{" "}
          <a
            href="https://github.com/SnoopyJacks/react-dictionary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <span className="visually-hidden">
              {" "} (opens in a new tab)
            </span>

          </a>{" "}
          · Hosted on{" "}
          <a
            href="https://reactappdictionary.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
            <span className="visually-hidden">
              {" "} (opens in a new tab)
            </span>
          </a>
          .
          </p>
        </footer>
      </div>
    </div>
  );
}