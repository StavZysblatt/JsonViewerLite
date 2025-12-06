import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ComparePage from "./pages/ComparePage";
import NavBar from "./components/NavBar";
import ReviewPage from "./pages/ReviewPage";
import './App.css'



function App() {

  return (
    <BrowserRouter>
    <NavBar />

    <Routes>
     <Route path="/" element={<UploadPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/review" element={<ReviewPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
