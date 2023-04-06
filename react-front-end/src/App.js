import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ethers } from 'ethers';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GrantPage from './pages/GrantPage';
import RankPage from './pages/RankPage';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [network, setNetwork] = useState('');

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />} />
        <Route path="/about" element={<AboutPage accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />} />
        <Route path="/grant" element={<GrantPage accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />} />
        <Route path="/rank" element={<RankPage accounts={accounts} setAccounts={setAccounts} network={network} setNetwork={setNetwork} />} />
      </Routes>
    </>
  );
}

export default App;