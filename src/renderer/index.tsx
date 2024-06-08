// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../app';

const container = document.getElementById('root');  // Ensure this ID matches your HTML file
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error('Root container not found!');
}
