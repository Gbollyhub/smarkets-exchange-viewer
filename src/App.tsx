import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import EventPage from "./pages/EventPage";
import { Toaster } from "sonner";
import RequireAuth from "./pages/auth/RequireAuth";
import PublicOnly from "./pages/auth/PublicOnly";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
        <TopBar />
        <Toaster richColors position="top-center" />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/:id" element={<EventPage />} />
          </Route>
          <Route element={<PublicOnly />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
