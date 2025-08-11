"use client";

import { useState } from "react";
import AddCarModal from "../../add_car/page"; // твой компонент модалки

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-indigo-600 tracking-wide select-none cursor-pointer">
            RYR-AUTO
          </a>

          {/* Десктоп меню */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li>
              <button
                onClick={() => setModalOpen(true)}
                className="hover:text-indigo-600 transition-colors duration-300"
              >
                Добавить машину
              </button>
            </li>
            <li>
              <a href="/about" className="hover:text-indigo-600 transition-colors duration-300">
                О сайте
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-indigo-600 transition-colors duration-300">
                Войти
              </a>
            </li>
          </ul>

          {/* Бургер меню для мобилок */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {/* Иконка бургер/крест */}
            <svg
              className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
            <svg
              className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-inner px-6 py-4">
            <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
              <li>
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="block hover:text-indigo-600 transition-colors duration-300"
                >
                  Добавить машину
                </button>
              </li>
              <li>
                <a href="/about" className="block hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  О сайте
                </a>
              </li>
              <li>
                <a href="/login" className="block hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  Войти
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <AddCarModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
