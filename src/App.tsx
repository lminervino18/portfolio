import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AboutMe } from './pages/AboutMe'
import { Projects } from './pages/Projects'
import { NavBar } from './components/NavBar'
import Particles from './components/Particles'
import './styles/global.css'

function App() {
  return (
    <div className="app-wrapper">
      <Particles
        particleColors={['#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
      />
      <div className="app-content">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
