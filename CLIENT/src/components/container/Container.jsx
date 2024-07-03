import React, { useEffect } from 'react';
import './container.css';
import { useSelector } from 'react-redux';

export default function Container({ children, className }) {
  const theme = useSelector((state) => state.themeChanger.theme);
  const dark = useSelector((state) => state.themeChanger.dark);
  console.log("dark",dark);
  console.log("theme",theme);
  
  return (
    <div
      className={`container-fluid py-5 ${dark ? "bg-black text-light" : "bg-light-subtle text-dark"} ${className}`}
      id="Container"
      data-bs-theme={theme}
    >
      {children}
    </div>
  );
}