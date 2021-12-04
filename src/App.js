<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
=======
import './App.css';
import SearchPhotos from "./photoSearch";
>>>>>>> main

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <div className="container">
        <h1 className="title">Photo API</h1>
        <SearchPhotos />
      </div>
>>>>>>> main
    </div>
  );
}

export default App;
