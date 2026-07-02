import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AnamnesisProvider } from "@/context/AnamnesisContext";
import Landing from "@/pages/Landing";
import ProfileSetup from "@/pages/ProfileSetup";
import Questionnaire from "@/pages/Questionnaire";
import Review from "@/pages/Review";
import Summary from "@/pages/Summary";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <AnamnesisProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/profile" element={<ProfileSetup />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/review" element={<Review />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-center" richColors />
        </AnamnesisProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
