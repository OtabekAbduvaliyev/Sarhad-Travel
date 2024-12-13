import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import CategoryDetails from './components/CategoryDetails'
import Flights from './components/Flights'
import FlightDetails from './components/FlightDetails'
import Testimonials from './components/Testimonials';
import TravelGuide from './components/TravelGuide';
import AdventurePlanner from './components/AdventurePlanner'
import PlaceGallery from './components/PlaceGallery'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return(
    <Router>
      <ScrollToTop />
      <main className="relative overflow-hidden pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div>
              <div className="max-w-[1440px] mx-auto px-8">
                <Hero />
              </div>
              <Flights />
              <CategorySection />
              <PlaceGallery />
              <TravelGuide />
              <Testimonials />
              <AdventurePlanner />
              <ContactForm />
            </div>
          } />
          <Route path="/flight/:id" element={<FlightDetails />} />
          <Route path="/category/:categoryId" element={<CategoryDetails />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App
