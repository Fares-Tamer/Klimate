import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import WeatherDashboard from "./pages/Weather-dashboard";
import CityPage from "./pages/City-page";
// import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {
    return (_jsxs("div", { className: "bg-linear-to-br from-background to-muted ", children: [_jsx(Navbar, {}), _jsxs("main", { className: "min-h-screen container mx-auto px-4 py-8", children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WeatherDashboard, {}) }), _jsx(Route, { path: "/city/:cityName", element: _jsx(CityPage, {}) })] }), _jsx(Toaster, { richColors: true })] }), _jsx(Footer, {})] }));
}
export default App;
