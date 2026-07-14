import logo from './dictionary.jpg';
import './App.css';
import Dictionary from './Dictionary';

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo img-fluid" alt="Dictionary application" width="120" height="106"/>
        </header>
        <main>
          <Dictionary defaultKeyword="computer" />
        </main>
        <footer className="text-center">
          Coded by Justine Ziola · Open-source on{" "}
          <a
            href="https://github.com/SnoopyJacks/react-dictionary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          · Hosted on{" "}
          <a
            href="https://reactappdictionary.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
          .
        </footer>
      </div>
    </div>
  );
}