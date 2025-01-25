import React from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-purple-300/50">
      {(location.pathname === '/login' || location.pathname === "/signup") ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
