import { Route, Routes } from "react-router-dom";
import { Categories } from "./Categories/Categories";
import { Games } from "./Games/Games";

export const Home = () => {
    return (
      <>
        <h2>Home</h2>

        <div>
            <Routes>
            <Route path="categories" element={<Categories/>}/>
            <Route path="games" element={<Games/>}/>
                
            </Routes>
        </div>
      </>
    );
  };
  