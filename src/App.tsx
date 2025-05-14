import { Routes, Route } from "react-router";

import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:lat/:long" element={<SearchPage />} />
        <Route path="*" element={<div>404 error</div>} />
      </Routes>
    </>
  );
}

export default App;
