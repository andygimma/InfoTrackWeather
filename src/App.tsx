import { Routes, Route } from "react-router";

import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchPage from "./pages/SearchPage";
import ComparePage from "./pages/ComparePage";
import Error404Page from "./pages/Error404Page";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:lat/:long" element={<SearchPage />} />
        <Route
          path="/compare/:lat1/:long1/:lat2/:long2"
          element={<ComparePage />}
        />

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  );
}

export default App;
