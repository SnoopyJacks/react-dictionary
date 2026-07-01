import logo from './dictionary.jpg';
import './App.css';
import Dictionary from './Dictionary';

export default function App() {
  return (
    <div className="App">
      <div className="container">
      <header className="App-header">
        <img src={logo} className="App-logo img-fluid" alt="logo" />
        <h1>Dictionary React App</h1>
      </header>
      <main>
        <Dictionary />
      </main>
      <footer className="text-center">
        Coded by Justine Ziola
      </footer>
    </div>
    </div>
  );
}