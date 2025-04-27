// import "antd/dist/antd.css";
import "./App.css";
import AddListing from "./pages/addlisting";
import Dashboard from "./pages/dashboard";
import Listing from "./pages/listing";
import ListingDetail from "./pages/listingdetail";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import MyProperties from "./pages/myproperties";
import MyProperty from "./pages/myproperty";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage/landingpage";
import Home from "./pages/home/home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-property" element={<AddListing />} />
          <Route
            path="/edit-property/:id"
            element={<AddListing isEditMode={true} />}
          />
          <Route
            path="/duplicate-property/:id"
            element={<AddListing isDuplicateMode={true} />}
          />
          <Route path="/listing" element={<Listing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/my-properties/:id" element={<MyProperty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
