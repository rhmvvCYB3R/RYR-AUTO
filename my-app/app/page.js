"use client";

import { useState } from "react";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

const initialCars = [
  {
    id: 1,
    username: "alex",
    description: "Моя любимая тачка, быстрая и стильная!",
    photo: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    username: "katya",
    description: "Второй дом на колесах!",
    photo: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Page() {
  const [cars] = useState(initialCars);
  const [likes, setLikes] = useState(
    cars.reduce((acc, car) => {
      acc[car.id] = 0;
      return acc;
    }, {})
  );
  const [dislikes, setDislikes] = useState(
    cars.reduce((acc, car) => {
      acc[car.id] = 0;
      return acc;
    }, {})
  );

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDislike = (id) => {
    setDislikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-wide">
          Автомобили пользователей
        </h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-3">
                <h2 className="text-white font-semibold text-lg tracking-wide capitalize">
                  {car.username}
                </h2>
              </div>

              <img
                src={car.photo}
                alt={`Фото машины пользователя ${car.username}`}
                className="w-full h-56 object-cover"
                loading="lazy"
              />

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-700 flex-grow leading-relaxed">{car.description}</p>

                <div className="mt-5 flex justify-between items-center">
                  <button
                    onClick={() => handleLike(car.id)}
                    aria-label="Лайк"
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 9l3 3m0 0l-3 3m3-3H8m13 3v2a2 2 0 01-2 2H7l-4 4V7a2 2 0 012-2h3"
                      />
                    </svg>
                    <span className="text-lg font-semibold select-none">{likes[car.id]}</span>
                  </button>

                  <button
                    onClick={() => handleDislike(car.id)}
                    aria-label="Дизлайк"
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 15l-3-3m0 0l3-3m-3 3h8m-13-3v-2a2 2 0 012-2h8l4-4v14a2 2 0 01-2 2h-3"
                      />
                    </svg>
                    <span className="text-lg font-semibold select-none">{dislikes[car.id]}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
