import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/pages/home";
import View from "./components/students/view";
import Edit from "./components/students/edit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/edit/:id" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
