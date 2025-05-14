import { Routes, Route, useParams } from "react-router";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:lat/:long" element={<SearchPage />} />
        <Route path="*" element={<div>404 error</div>} />
      </Routes>
    </>
  );
}

export default App;
