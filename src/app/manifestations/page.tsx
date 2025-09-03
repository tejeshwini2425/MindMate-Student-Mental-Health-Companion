"use client";

import { useEffect, useState } from "react";

interface Manifestation {
  id: number;
  content: string;
  createdAt: string;
}

export default function ManifestationsPage() {
  const [manifestations, setManifestations] = useState<Manifestation[]>([]);
  const [newManifestation, setNewManifestation] = useState("");

  // Fetch manifestations
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/journals/manifestations");
      const data = await res.json();
      setManifestations(data);
    }
    fetchData();
  }, []);

  // Add new manifestation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManifestation.trim()) return;

    const res = await fetch("/api/journals/manifestations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newManifestation }),
    });

    const data = await res.json();
    setManifestations((prev) => [...prev, data]);
    setNewManifestation("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌟 Manifestation Guide</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <textarea
          value={newManifestation}
          onChange={(e) => setNewManifestation(e.target.value)}
          placeholder="Write your manifestation here..."
          style={{ width: "100%", padding: "10px", height: "80px" }}
        />
        <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>
          Add Manifestation
        </button>
      </form>

      {/* List */}
      <ul>
        {manifestations.map((m) => (
          <li key={m.id} style={{ marginBottom: "10px" }}>
            ✨ {m.content} <br />
            <small>{new Date(m.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
