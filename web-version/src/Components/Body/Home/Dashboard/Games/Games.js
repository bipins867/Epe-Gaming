import { Link, Navigate, Route, Routes } from "react-router-dom";
import { LeaderboardPage } from "./Leaderboard/Leaderboard";
import { EventsPage } from "./Events/Events";
import { HomePage } from "./Home/Home";

export const GamesPage = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="./">Home</Link>
        </li>
        <li>
          <Link to="./leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="./events">Events</Link>
        </li>
      </ul>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="*" element={<Navigate to="./" replace />} />
      </Routes>
    </>
  );
};
