import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/layout/theme-provider";
import "./index.css";
import Index from "./pages/index";

// Mock components for routes that aren't implemented yet
const MockComponent = ({ name }: { name: string }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">{name} Page</h1>
    <p>This page is under construction.</p>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/avatar' element={<MockComponent name="Avatar" />} />
        <Route path='/instruments' element={<MockComponent name="Instruments" />} />
        <Route path='/play' element={<MockComponent name="Play" />} />
        <Route path='/achievements' element={<MockComponent name="Achievements" />} />
        <Route path='/settings' element={<MockComponent name="Settings" />} />
        <Route path='/login' element={<MockComponent name="Login" />} />
        <Route path='/signup' element={<MockComponent name="Signup" />} />
        <Route path='/logout' element={<MockComponent name="Logout" />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);