import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="flex md:overflow-y-hidden flex-col justify-center py-8 space-y-4 px-6 md:px-8">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        TODO APP
      </h2>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
