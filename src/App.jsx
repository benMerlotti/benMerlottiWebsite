// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vfx3D from './pages/Vfx3D';
import Dev from './pages/Dev';
import Video from './pages/Video';
import Reel from './pages/Reel';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';

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
        },
        {
          path: "reel",
          element: <Reel />
        },
        {
          path: "store",
          element: <Store />
        },
        {
          path: "store/vhs-karaoke-text-template",
          element: <ProductDetail />
        },
        {
          path: "store/success",
          element: <Success />
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