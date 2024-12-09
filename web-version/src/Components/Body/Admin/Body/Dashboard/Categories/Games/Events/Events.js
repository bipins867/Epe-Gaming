import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Home/Home";
import { InfoPage } from "./Info/Info";

export const EventsPage = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path=":eventId" element={<InfoPage />} />
        <Route path="*" element={<Navigate to="./" replace />} />
      </Routes>
    </>
  );
};
