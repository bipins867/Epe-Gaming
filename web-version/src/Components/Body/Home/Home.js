import { Route, Routes } from "react-router-dom";
import { Categories } from "./Categories/Categories";
import { Games } from "./Games/Games";
import { AboutUs } from "./AboutUs/AboutUs";
import { AppDownload } from "./AppDownload/AppDownload";
import { TournamentHighlights } from "./TournamentHighlights/TournamentHighlights";
import { VideoGallery } from "./VideoGallery/VideoGallery";
export const Home = () => {
    return (
      <>
      <AppDownload/>
      <AboutUs/>
      <TournamentHighlights/>
      <VideoGallery/>
        <div>
            <Routes>
            <Route path="categories" element={<Categories/>}/>
            <Route path="games" element={<Games/>}/>
                
            </Routes>
        </div>
      </>
    );
  };
  