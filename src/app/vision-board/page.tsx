"use client";

import { useState, useEffect } from "react";

type VisionItem = {
  id: number;
  text: string;
  image: string | null;
  category?: string;
  createdAt: string;
};

export default function VisionBoardPage() {
  // State
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [items, setItems] = useState<VisionItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch vision board items on mount
  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const res = await fetch("/api/vision-board");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new item
  const addItem = async () => {
    if (!input && !image) return;

    const newItem = {
      text: input,
      image: image,
    };

    try {
      const res = await fetch("/api/vision-board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const savedItem = await res.json();
      setItems((prev) => [savedItem, ...prev]);
      setInput("");
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🌈 Digital Vision Board</h1>
      <p className="text-gray-600 mb-6">
        Add images + affirmations to create your dream board ✨
      </p>

      {/* Add Item Form */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your goal or affirmation..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      {/* Preview if uploading */}
      {image && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Preview:</p>
          <img
            src={image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Vision Board Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 italic">
          Your board is empty. Start adding goals 🌱
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition flex flex-col items-center"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt="Vision"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <p className="text-gray-800 text-center">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
