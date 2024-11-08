import React from "react";
import "./AboutUs.css";

import { Container, Row, Col } from "react-bootstrap";

export const AboutUs = () => {
  return (
    <Container className="my-5 about-us">
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">About Us</h1>
          <p className="lead text-center">
            The most reliable eSport app for Indian users!
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <p>
            Founded in 2023 with a single mission to provide a world-class
            online eSport experience to online gaming enthusiasts. PPL is the
            most steadfast app any online gaming fanatic can rely on.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <h3 className="mb-3">Our Vision</h3>
          <p>
            “A strong vision and mission lead you to your intended destination.”
          </p>
          <p>
            Our vision is to make online gaming a supercool, thrilling, and
            winning experience for eSport fans. The eSports industry is booming,
            and Pro Play League (PPL) is unfurling the magic of online gaming
            across India.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <h3 className="mb-3">Who We Are</h3>
          <p>
            PPL is an Ultimate Solution to all your eSports Games. It is an
            Online Portal which Offers Rewards and Unlimited Entertainment for
            Participating and Playing Games Online. Users can play multiple
            online games like Battlegrounds Mobile India (BGMI), Free Fire, Call
            of Duty Mobile, etc., and earn rewards and prizes based on their
            in-game performance.
          </p>
          <p>
            Founded on the 3rd day of July 2023, by Founder Mr. Sanjay Singhania
            and Co-Founder Mrs. Sandhya, and developed by two young minds, Mr.
            Bipin Singh & Mr. Alok Prajapati from Uttar Pradesh, India!
          </p>
          <p>
            You might be addicted to Online Games, but just think—what if you
            could start making money or even a living by playing mobile games?
            Well, that’s what PPL offers. Users can participate in upcoming
            eSports games and win amazing prizes and rewards.
          </p>
          <p>
            Participate in tournaments for games like Free Fire, Call of Duty
            Mobile, Fortnite, Battlegrounds Mobile India, and more to earn huge
            rewards daily. Users can join custom rooms, earn rewards for Chicken
            Dinners, and even for each kill they score. Sounds cool, huh? Give
            it a try!
          </p>
        </Col>
      </Row>
    </Container>
  );
};
