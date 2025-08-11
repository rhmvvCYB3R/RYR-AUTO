"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function AboutPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Анимация появления через 300 мс
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 sm:py-20 flex flex-col md:flex-row items-center md:items-start gap-12">
        
        {/* Картинка с анимацией */}
        <div
          className={`flex-shrink-0 w-full md:w-[600px] lg:w-[700px] max-w-full rounded-xl shadow-lg overflow-hidden transform transition-transform duration-700 ease-out ${
            showContent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
          style={{ aspectRatio: "1200 / 1171" }}
        >
          <img
            src="photo.jpg"
            alt="RYR-AUTO about photo"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Текст с анимацией */}
        <div
          className={`max-w-xl text-center md:text-left space-y-6 transform transition-opacity duration-700 ease-out ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
            О RYR-AUTO
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Добро пожаловать на <span className="font-semibold text-indigo-600">RYR-AUTO</span> — место,
            где каждый автолюбитель может поделиться своей машиной и рассказать её историю.
          </p>
          <p className="text-gray-600 italic tracking-wide">
            Этот сайт создан просто так. ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫы
          </p>
          <p className="text-gray-700">
            Присоединяйся, загружай фотографии своих автомобилей, ставь лайки друзьям и просто наслаждайся красотой железа.
            А если что-то не так — помни, что <span className="text-indigo-600 font-semibold">все права не защищены!</span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
