import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import CollectionsShowcase from "../components/sections/CollectionsShowcase";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import MostSellingProducts from "../components/sections/MostSellingProducts";
import Ordering from "../components/sections/Ordering";
import Reviews from "../components/sections/Reviews";
import DeliveryInfo from "../components/sections/DeliveryInfo";
import Contact from "../components/sections/Contact";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-dark overflow-x-hidden">
      <Navbar />
      <Hero />
      <CollectionsShowcase />
      <About />
      <Services />
      <MostSellingProducts />
      <Ordering />
      <Reviews />
      <DeliveryInfo />
      <Contact />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
