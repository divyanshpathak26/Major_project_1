import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Prediction from "./pages/Prediction.jsx";
import Community from "./pages/Community.jsx";
import EmergencyContacts from "./pages/EmergencyContacts.jsx";
import SafetyAnalytics from "./pages/SafetyAnalytics.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="w-full px-4 py-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
              <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/prediction" element={<ProtectedRoute><PageWrapper><Prediction /></PageWrapper></ProtectedRoute>} />
              <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
              <Route path="/emergency-contacts" element={<PageWrapper><EmergencyContacts /></PageWrapper>} />
              <Route path="/safety-analytics" element={<PageWrapper><SafetyAnalytics /></PageWrapper>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </AuthProvider>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl shadow-lg bg-white/80 dark:bg-gray-900/80 p-6 backdrop-blur"
    >
      {children}
    </motion.div>
  );
}
