import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Elegance from './components/Elegance'
import ProductGrid from './components/ProductGrid'
import Collections from './components/Collections'
import CubanClassic from './components/CubanClassic'
import Heritage from './components/Heritage'
import Footer from './components/Footer'
import ContactPage from './ContactPage'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f5f5f0]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Elegance />
        <ProductGrid />
        <Collections />
        <CubanClassic />
        <Heritage />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
