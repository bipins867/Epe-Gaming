import { Navigate, Route, Routes } from "react-router-dom";
import "./Referral.css";
import { SearchPage } from "../Utils/Search/Search";
import { ViewPage } from "./View/View";

export const ReferralPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="view/:customerId" element={<ViewPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
