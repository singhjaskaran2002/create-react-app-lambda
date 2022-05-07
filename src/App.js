import React from 'react'
import Navbar from './components/Navbar'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <div className="main-app">
      <Navbar />
      <Sidebar />
      <div className="navigation-body">
        <Navigation />
      </div>
    </div>
  )
}

export default App
