import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ComparePage from "./pages/ComparePage";
import './App.css'

function App() {

  return (
    <BrowserRouter>

    <Routes>
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/compare" element={<ComparePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
