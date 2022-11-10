import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";

function App() {
  // MainRoutes contains all the navigation components and url

  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
