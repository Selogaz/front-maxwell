import React from 'react';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1>My Next.js App</h1>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2023 My Next.js App
      </footer>
    </div>
  );
};

export default DefaultLayout;