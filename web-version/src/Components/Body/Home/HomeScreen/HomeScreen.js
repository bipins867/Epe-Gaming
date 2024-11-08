// HomeScreen.js
import React from "react";
import { AppDownload } from "./AppDownload/AppDownload";

export const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to Pro Player League</h1>
      <p>This is the homepage content.</p>

      <AppDownload />
    </div>
  );
};
