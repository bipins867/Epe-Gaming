import { Navigate, Route, Routes, NavLink } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { TermsAndConditions } from "./TermsAndConditions/TermsAndConditions";
import { PPLSafetyPrecautions } from "./PPLSafetyPrecautions/PPLSafetyPrecautions";
import { ResponsiblePlayPolicy } from "./ResponsiblePlayPolicy/ResponsiblePlayPolicy";
import { ReturnRefundAndCancellationPolicy } from "./ReturnRefundAndCancellationPolicy/ReturnRefundAndCancellationPolicy";
import { PrivacyPolicy } from "./PrivacyPolicy/PrivacyPolicy";

export const Legality = () => {
  return (
    <Container>
      <h1 className="mt-4 mb-3">Legality</h1>
      <Row>
        <Col md={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Link
              as={NavLink}
              to="termsAndConditions"
              activeClassName="active"
            >
              Terms and Conditions
            </Nav.Link>
            <Nav.Link as={NavLink} to="privacyPolicy" activeClassName="active">
              Privacy Policy
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="pplSafetyPrecautions"
              activeClassName="active"
            >
              PPL Safety Precautions
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="responsiblePlayPolicy"
              activeClassName="active"
            >
              Responsible Play Policy
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="returnRefundAndCancellationPolicy"
              activeClassName="active"
            >
              Return, Refund, and Cancellation Policy
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <Routes>
            <Route path="termsAndConditions" element={<TermsAndConditions />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route
              path="pplSafetyPrecautions"
              element={<PPLSafetyPrecautions />}
            />
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
        </Col>
      </Row>
    </Container>
  );
};
