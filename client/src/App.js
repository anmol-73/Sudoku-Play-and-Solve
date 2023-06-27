import Navbar from "./components/Navbar";
import SudokuGrid from "./components/SudokuGrid";
import GridColorButtons from "./components/GridColorButtons";
import GridDifficultyButtons from "./components/GridDifficultyButtons";
import { useState } from "react";
import UtilityButtons from "./components/UtilityButtons";
import Numpad from "./components/Numpad";
import RightSide from "./components/RightSide";
import Home from "./pages/Home";
import Solve from "./pages/Solve";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from "./components/Timer";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/solve" element={<Solve />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
