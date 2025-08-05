// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vfx3D from './pages/Vfx3D';
import Dev from './pages/Dev';
import Video from './pages/Video';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "edit-shoot",
          element: <Video />
        },
        {
          path: "vfx-3d",
          element: <Vfx3D />
        },
        {
          path: "dev",
          element: <Dev />
        }
      ]
    }
  ]
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;