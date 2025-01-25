import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'

function App() {
  return (
    <div className="min-h-screen bg-purple-300/50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
