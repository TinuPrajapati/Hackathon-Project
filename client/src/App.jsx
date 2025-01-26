import React from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Headerlanding from './Pages/Headerlanding';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-purple-300/50">
      {(location.pathname === '/login' || location.pathname === "/signup") ? (
        <Outlet />
      ) : (
        <>
          {(location.pathname == "/" || location.pathname == "/about" || location.pathname == "/contact") ? <Headerlanding /> : <Header />}
          <main className="max-w-7xl">
            <Outlet />
          </main>
          {(location.pathname != "/" || location.pathname != "/about" || location.pathname != "/contact") && <Footer/>}
          {/* <Footer/> */}
        </>
      )}
    </div>
  );
}

export default App;
