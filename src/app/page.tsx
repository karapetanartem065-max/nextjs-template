'use client';

import { useState } from 'react';

export default function Home() {
  const [balance, setBalance] = useState(0);

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: '#ffd700' }}>VAULT RAY</h1>
      <div style={{ fontSize: '40px', margin: '20px 0' }}>{balance}</div>
      <button 
        onClick={() => setBalance(b => b + 1)}
        style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'gold', fontSize: '50px' }}
      >
        ⚡️
      </button>
    </main>
  );
}
