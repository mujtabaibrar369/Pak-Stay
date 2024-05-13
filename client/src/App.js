import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import AllHotels from "./pages/allHotel/allHotels";
import AllResorts from "./pages/allResort/allresorts";
import NewProperty from "./pages/listnewproperty/newProperty";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import NewHotel from "./pages/addListing/NewHotel";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hotelsproperties" element={<AllHotels />} />
          <Route path="/resortsproperties" element={<AllResorts />} />
          <Route path="/listnewproperty" element={<NewProperty />} />
          <Route path="/addproperty" element={<NewHotel />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
