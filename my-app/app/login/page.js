"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const usersStr = localStorage.getItem("carshare_users");
    const users = usersStr ? JSON.parse(usersStr) : [];

    const userExists = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!userExists) {
      setError("Неверный логин или пароль");
      return;
    }

    localStorage.setItem("carshare_user", JSON.stringify({ username }));

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-400 to-purple-600 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full sm:p-10"
        >
          <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Вход в RYR-AUTO
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm sm:text-base">
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span className="text-gray-700 font-semibold text-sm sm:text-base">Логин</span>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none text-black"
              placeholder="Введите логин"
              autoComplete="username"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-semibold text-sm sm:text-base">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none text-black"
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors text-sm sm:text-base"
          >
            Войти
          </button>

          <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
            Нет аккаунта?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Зарегистрироваться
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
