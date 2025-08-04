// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vfx3D from './pages/Vfx3D';
import Dev from './pages/Dev';
import Video from './pages/Video';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home page as the default */}
        <Route index element={<Home />} />
        
        <Route path="about" element={<About />} />
        <Route path="edit-shoot" element={<Video />} />
        <Route path="vfx-3d" element={<Vfx3D />} />
        <Route path="dev" element={<Dev />} />
      </Route>
    </Routes>
  );
}

export default App;