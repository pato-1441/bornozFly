import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";



const App = () => {
  return(
          <BrowserRouter>
            <NavBar/>
          </BrowserRouter>
  );
};

export default App;
