import { Navigate, Route, Routes } from "react-router-dom";
import { TermsAndConditions } from "./TermsAndConditions/TermsAndConditions";

import { PPLSafetyPrecautions } from "./PPLSafetyPrecautions/PPLSafetyPrecautions";
import { ResponsiblePlayPolicy } from "./ResponsiblePlayPolicy/ResponsiblePlayPolicy";
import { ReturnRefundAndCancellationPolicy } from "./ReturnRefundAndCancellationPolicy/ReturnRefundAndCancellationPolicy";
import { PrivacyPolicy } from "./PrivacyPolicy/PrivacyPolicy";

export const Legality = () => {
  return (
    <>
      <h1>Legality</h1>

      <Routes>
        <Route path="termsAndConditions" element={<TermsAndConditions />} />
        <Route path="privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="pplSafetyPrecautions" element={<PPLSafetyPrecautions />} />
        <Route
          path="responsiblePlayPolicy"
          element={<ResponsiblePlayPolicy />}
        />
        <Route
          path="returnRefundAndCancellationPolicy"
          element={<ReturnRefundAndCancellationPolicy />}
        />
        <Route
          path="*"
          element={<Navigate to="termsAndConditions" replace />}
        />
      </Routes>
    </>
  );
};
