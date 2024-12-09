import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Home/Home";
import { GamesPage } from "./Games/Games";
import { ImageSliderPage } from "./ImageSlider/ImageSlider";

export const CategoriesPage = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="type/:gameTitle/*" element={<GamesPage />} />
        <Route path="imageSlider" element={<ImageSliderPage />} />
        <Route path="*" element={<Navigate to="./" replace />} />
      </Routes>
    </>
  );
};
