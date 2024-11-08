import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./ReturnRefundAndCancellationPolicy.css";

export const ReturnRefundAndCancellationPolicy = () => {
  return (
    <Container className="return-refund-policy">
      <Row>
        <Card>
          <Card.Body>
            <Col>
              <h2 className="text-center mb-4">
                Return, Refund & Cancellation Policy
              </h2>
              <p className="text-center text-muted">
                <em>Date of Last Update: 06-11-2024</em>
              </p>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    Policy Overview
                  </Card.Title>
                  <Card.Text>
                    This Return, Refund, and Cancellation Policy outlines the
                    guidelines and terms for refunds and cancellations for
                    services provided by PPL. Please read the following
                    carefully to understand how we handle such situations.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    1. Refunds for Service Errors
                  </Card.Title>
                  <Card.Text>
                    In the event that there is an error in the services provided
                    by us, we may refund the Entry Fee, provided the reasons are
                    genuine and proved after investigation by PPL.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    2. Game and Contest Rules
                  </Card.Title>
                  <Card.Text>
                    Please read the rules of each Mobile Game and Contest before
                    participating to ensure you understand all terms and
                    conditions before participating.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    3. Registration Cancellation
                  </Card.Title>
                  <Card.Text>
                    We do not cancel registrations once entered. However, in
                    exceptional circumstances, such as issues with the payment
                    gateway or from our side, we may cancel your participation
                    on request and refund the Entry Fee within a reasonable
                    amount of time.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    4. Refund for Cancelled Participation
                  </Card.Title>
                  <Card.Text>
                    In case we cancel your participation in any Mobile Game or
                    Contest as a result of this, we will return Your Entry Fee
                    to You within a reasonable amount of time for You to redeem
                    the same by playing other Contests on PPL.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    5. Payment Method for Refunds
                  </Card.Title>
                  <Card.Text>
                    We will try Our best to create the best user experience for
                    You. If paid by credit card, refunds will be issued to the
                    original credit card provided at the time of purchase and in
                    case of payments made through a payment gateway, payment
                    refunds will be made to the same account. account.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    6. Unused Account Balance
                  </Card.Title>
                  <Card.Text>
                    Users must use any money in their Account within 365 days.
                    PPL shall have the right to directly forfeit any such unused
                    amount after 365 (three hundred and sixty-five) days. The
                    idle Balance amount lying in your account may be withdrawn
                    only in exceptional circumstances, determined on a
                    case-to-case basis on the sole discretion of PPL.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};
