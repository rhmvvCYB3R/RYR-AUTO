"use client";

import { useState, useEffect } from "react";

export default function AddCarModal({ isOpen, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isOpen) {
      // сброс состояния при закрытии модалки
      setPhoto(null);
      setPhotoPreview(null);
      setDescription("");
      setError("");
      setSuccess("");
    }
  }, [isOpen]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Пожалуйста, выберите корректное фото.");
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photo) {
      setError("Фото обязательно.");
      return;
    }

    if (!description.trim()) {
      setError("Описание не может быть пустым.");
      return;
    }

    // TODO: логика сохранения

    setError("");
    setSuccess("Авто успешно добавлено!");
    setPhoto(null);
    setPhotoPreview(null);
    setDescription("");

    setTimeout(() => {
      setSuccess("");
      onClose();
    }, 1500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-filter backdrop-blur-md"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 mx-4 sm:mx-0 overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Добавить новое авто
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="photo">
              Фото авто
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                cursor-pointer"
              required
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="mt-4 rounded-lg max-h-48 object-contain mx-auto"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Описание
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-700"
              placeholder="Напишите немного о вашей машине..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
}
