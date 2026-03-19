
import { Route, Routes } from "react-router-dom";

import WeatherDashboard from "./pages/Weather-dashboard";
import CityPage from "./pages/City-page";
// import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";




function App() {
  return (

    <div className="bg-linear-to-br from-background to-muted ">
      <Navbar/> 
      <main className="min-h-screen container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/city/:cityName" element={<CityPage />} />

        </Routes>
        <Toaster richColors/> 
      </main>
      <Footer/>
    </div>

  )

}

export default App;