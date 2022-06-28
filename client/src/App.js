import './App.css';
import {Routes, Route} from "react-router"; 
import {BrowserRouter} from "react-router-dom"; 
import{React} from "react";
import {LandingPage} from "./components/LandingPage.jsx";
import {Home} from "./components/Home.jsx";
import {Form} from "./components/Form.jsx";
import Detail from "./components/Detail.jsx";

function App() {
  return (
    <BrowserRouter> 
     <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route exact path="/home" element={<Home/>}/>  
          <Route exact  path="/form" element={<Form/>}/>
          <Route  exact path= "/home/:id" element={<Detail/>}/>
         
       </Routes>
     </div>
    </BrowserRouter> 
  );
}

export default App;
