import React from 'react';
import Navigation from "./components/Navigation";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import HomeController from "./pages/Home/HomeController";
import SingleMoviePageController from "./pages/SingleMovie/Application/SingleMoviePageController";
import MovieDiscoveryPageController from "./pages/MovieDiscovery/Application/MovieDiscoveryPageController";
import SearchResults from "./pages/SearchResults/SearchResults";

function App() {
  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<HomeController />} />
                    <Route path="/discover-movies" element={<MovieDiscoveryPageController />} />
                    <Route path="/movie/:id" element={<SingleMoviePageController />} />
                    <Route path="search-results/:query" element={<SearchResults />} />
                </Route>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
