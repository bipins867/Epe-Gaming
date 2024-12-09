import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Home/Home";
import { EventsPage } from "./Events/Events";
import { ImageSliderPage } from "./ImageSlider/ImageSlider";

export const GamesPage = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="events/*" element={<EventsPage />} />
        <Route path="imageSlider" element={<ImageSliderPage />} />
        <Route path="*" element={<Navigate to="./" replace />} />
      </Routes>
    </>
  );
};
