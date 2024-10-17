
// App.js
import React from 'react';
import { useState } from 'react';
import Heading from './components/User/Heading';
import Foodter from './components/User/Foodter';
// import router from './components/User/Main/index';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Heading setSearchQuery={setSearchQuery} />
      <main>
        <Outlet />
      </main>
      <Foodter />
    </>
  );
}

export default App;
