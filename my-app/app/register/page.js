"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Пожалуйста, заполните все поля");
      setSuccess("");
      return;
    }

    // Простая проверка email на формат
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Введите корректный email");
      setSuccess("");
      return;
    }

    // Получаем список пользователей из localStorage
    const usersStr = localStorage.getItem("carshare_users");
    const users = usersStr ? JSON.parse(usersStr) : [];

    // Проверяем уникальность username и email
    if (users.find((u) => u.username === username)) {
      setError("Пользователь с таким логином уже существует");
      setSuccess("");
      return;
    }
    if (users.find((u) => u.email === email)) {
      setError("Пользователь с таким email уже существует");
      setSuccess("");
      return;
    }

    // Добавляем нового пользователя
    users.push({ username, email, password });
    localStorage.setItem("carshare_users", JSON.stringify(users));

    setError("");
    setSuccess("Регистрация прошла успешно! Сейчас перенаправим на вход...");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-400 to-purple-600 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
        <form
          onSubmit={handleRegister}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full sm:p-10"
        >
          <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Регистрация в RYR-AUTO
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm sm:text-base">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center text-sm sm:text-base">
              {success}
            </div>
          )}

          <label className="block mb-4">
            <span className="text-gray-700 font-semibold text-sm sm:text-base">
              Логин
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
                setSuccess("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none text-black"
              placeholder="Введите логин"
              required
              autoComplete="username"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 font-semibold text-sm sm:text-base">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none text-black"
              placeholder="Введите email"
              required
              autoComplete="email"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-semibold text-sm sm:text-base">
              Пароль
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
                setSuccess("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none text-black"
              placeholder="Введите пароль"
              required
              autoComplete="new-password"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors text-sm sm:text-base"
          >
            Зарегистрироваться
          </button>

          <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
            Уже есть аккаунт?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Войти
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
