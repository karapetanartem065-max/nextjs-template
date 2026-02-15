'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase'; // Тот файл, который ты создал
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function Home() {
  const [activeTab, setActiveTab] = useState('mining');
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState('test_user'); // Для теста, потом заменим на TG ID

  // Цвета "Сбер-премиум"
  const cardBg = '#1c1c1e'; 
  const sberGreen = '#21a038';

  // 1. ЗАГРУЗКА ДАННЫХ ПРИ ВХОДЕ
  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBalance(docSnap.data().balance);
      } else {
        // Если юзера нет в базе — создаем его
        await setDoc(docRef, { balance: 0, lastLogin: new Date() });
      }
    };
    loadData();
  }, [userId]);

  // 2. ЛОГИКА КЛИКА И СОХРАНЕНИЯ
  const handleTap = async () => {
    const newBalance = balance + 1;
    setBalance(newBalance);

    // Сохраняем в базу каждое 10-е нажатие
    if (newBalance % 10 === 0) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { balance: newBalance });
    }
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', paddingBottom: '100px', fontFamily: 'sans-serif' }}>
      
      {/* 1. ВЕРХНЯЯ КАРТОЧКА (СБЕР-СТИЛЬ) */}
      <div style={{ padding: '20px' }}>
        <div style={{ backgroundColor: cardBg, borderRadius: '24px', padding: '20px', border: '1px solid #333' }}>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>Баланс VAULT RAY</p>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            {balance.toLocaleString()} <span style={{ color: '#ffd700' }}>RAY</span>
          </h1>
        </div>
      </div>

      {/* 2. КОНТЕНТ ВКЛАДОК */}
      <div style={{ padding: '0 20px' }}>
        {activeTab === 'mining' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <button 
              onClick={handleTap}
              style={{
                width: '240px', height: '240px', borderRadius: '50%',
                background: 'radial-gradient(circle, #ffd700 0%, #b8860b 100%)',
                fontSize: '80px', border: '8px solid #444',
                cursor: 'pointer', boxShadow: '0_0_40px_rgba(255,215,0,0.2)',
                outline: 'none', transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              ⚡️
            </button>
            <p style={{ marginTop: '20px', color: '#888' }}>Нажимай, чтобы добывать</p>
          </div>
        )}

        {activeTab === 'shop' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Магазин бустов</h2>
            <div style={{ backgroundColor: cardBg, padding: '15px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🚀 Автокликер</span>
              <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold' }}>Купить</button>
            </div>
          </div>
        )}
      </div>

      {/* 3. НИЖНЕЕ МЕНЮ (TAB BAR) */}
      <nav style={{
        position: 'fixed', bottom: '20px', left: '15px', right: '15px',
        height: '70px', backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(15px)', borderRadius: '20px',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.1)', zIndex: 1000
      }}>
        {[
          {id: 'mining', icon: '⚡️', n: 'Майнинг'},
          {id: 'tasks', icon: '📋', n: 'Задания'},
          {id: 'friends', icon: '👥', n: 'Друзья'},
      {id: 'shop', icon: '🛒', n: 'Маркет'},
          {id: 'wallet', icon: '💎', n: 'Кошелек'}
        ].map(item => (
          <div 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{ 
              textAlign: 'center', opacity: activeTab === item.id ? 1 : 0.5,
              transition: '0.2s', cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '20px' }}>{item.icon}</div>
            <div style={{ fontSize: '10px', marginTop: '4px' }}>{item.n}</div>
          </div>
        ))}
      </nav>

    </main>
  );
}
