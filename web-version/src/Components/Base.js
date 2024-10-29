import React from "react";
import './Base.css';
import { Body } from "./Body/Body";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { ShuffledBackground} from "./ShuffledBackground/ShuffledBackground";

export const Base = () => {
  return (
    <>
      <div className="app-container">
      <ShuffledBackground/>
      <Header />
      <Body />
      <Footer />
      </div>
    </>
  );
};
