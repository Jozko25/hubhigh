'use client';

import React, { useEffect } from 'react';

export const ComingSoon = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      color: 'white',
    }}>
      <h1 style={{
        fontSize: '5rem',
        color: '#e0cffc',
        textShadow: '0 0 10px #e0cffc, 0 0 20px #e0cffc, 0 0 30px #d1a9ff, 0 0 40px #d1a9ff, 0 0 50px #d1a9ff, 0 0 60px #d1a9ff, 0 0 70px #d1a9ff',
        textAlign: 'center',
        padding: '20px',
      }}>
        Už čoskoro.
      </h1>
    </div>
  );
};

export default ComingSoon;
