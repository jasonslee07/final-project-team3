import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./components/PageNotFound";
import ClientProfile from "./pages/ClientProfile";
import VendorProfile from "./pages/VendorProfile";
import ItemPage from "./pages/ItemPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/client-profile" element={<ClientProfile />}></Route>
          <Route path="/vendor-profile" element={<VendorProfile />}></Route>
          <Route path="/item-page" element={<ItemPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
