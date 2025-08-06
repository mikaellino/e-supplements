import { useState } from 'react'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Home />
      </div>
    </div>
  )
}

export default App
