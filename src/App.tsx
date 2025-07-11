import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AboutMe } from './pages/AboutMe'
import { Projects } from './pages/Projects'
import { NavBar } from './components/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  )
}

export default App
