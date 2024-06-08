// src/App.tsx
import React, { useEffect } from 'react';
import MainPage from './pages/MainPage';

const App = () => {

    useEffect(() => {
        console.log("App component mounted");
        return () => {
            console.log("App component unmounted");
        };
    }
    , []);
    
    return (
        <div>
            <MainPage />
        </div>
    );
};

export default App;
