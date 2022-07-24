import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApp from "./config";
import { Analytics, Dashboard, Login, Register } from "./pages";
import NotFound from "./pages/NotFound";
import Penjual from "./pages/Penjual";
import Retribusi from "./pages/Retribusi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="penjual" element={<Penjual />} />
          <Route path="retribusi" element={<Retribusi />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
