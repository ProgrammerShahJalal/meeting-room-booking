import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import MeetingRoomsPage from "./pages/MeetingRoomsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RoomDetails from "./pages/RoomDetails";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import MyBookingPage from "./pages/MyBookingPage";
import AdminRoute from "./components/AdminRoute";
import AdminDashboardMain from "./pages/AdminDashboardMain";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BookingPage from "./pages/BookingPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/meeting-rooms" element={<MeetingRoomsPage />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardMain />
                </AdminRoute>
              }
            />
            <Route
              path="/rooms/:id"
              element={
                <PrivateRoute>
                  <RoomDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/book-room/:id"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBookingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/success/"
              element={
                <PrivateRoute>
                  <PaymentSuccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/cancel"
              element={
                <PrivateRoute>
                  <PaymentCancel />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/termsOfService" element={<TermsOfService />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {/* Scroll to Top Button */}
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  );
}
