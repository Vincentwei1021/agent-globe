"use client";
import { useState, useEffect } from "react";
import type { GeoInfo } from "@/types";
import { detectLocation } from "@/lib/geolocation";
import { addAgent } from "@/lib/storage";

interface RegisterFormProps {
  onRegistered: (agentId: string) => void;
}

export default function RegisterForm({ onRegistered }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [detecting, setDetecting] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    detectLocation().then((geo: GeoInfo | null) => {
      if (geo) {
        setCity(geo.city);
        setCountry(geo.country);
        setCountryCode(geo.countryCode);
        setLat(geo.lat);
        setLng(geo.lng);
      }
      setDetecting(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Agent name is required"); return; }
    if (name.trim().length < 2) { setError("Name must be at least 2 characters"); return; }
    if (!city.trim()) { setError("City is required"); return; }
    if (!country.trim()) { setError("Country is required"); return; }

    setSubmitting(true);
    try {
      const agent = addAgent({
        name: name.trim(),
        description: description.trim(),
        city: city.trim(),
        country: country.trim(),
        countryCode: countryCode || "XX",
        lat: lat || 0,
        lng: lng || 0,
      });
      setSuccess(true);
      onRegistered(agent.id);
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-cyan-500/30 bg-space-800/60 p-6 text-center backdrop-blur-sm animate-fade-in">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-cyan-400">Agent Registered!</h3>
        <p className="mt-2 text-gray-400 text-sm">
          <strong className="text-white">{name}</strong> is now glowing on the globe from {city}, {country}.
        </p>
        <button onClick={() => { setSuccess(false); setName(""); setDescription(""); }} className="mt-4 rounded-full border border-cyan-500/30 px-5 py-2.5 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/10">
          Register Another Agent
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-cyan-500/20 bg-space-800/60 p-6 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-1">🤖 Register Your Agent</h3>
      <p className="text-sm text-gray-400 mb-5">Light up your spot on the globe</p>

      {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Agent Name *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. GPT-4 Navigator" maxLength={50}
            className="w-full rounded-lg border border-gray-700 bg-space-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description <span className="text-gray-500">(optional)</span></label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="What does your agent do?" maxLength={120}
            className="w-full rounded-lg border border-gray-700 bg-space-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder={detecting ? "Detecting..." : "City"}
              className="w-full rounded-lg border border-gray-700 bg-space-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Country *</label>
            <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder={detecting ? "Detecting..." : "Country"}
              className="w-full rounded-lg border border-gray-700 bg-space-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
          </div>
        </div>

        {detecting && (
          <p className="text-xs text-cyan-400 animate-pulse">📡 Detecting your location via IP...</p>
        )}

        <button type="submit" disabled={submitting}
          className="w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? "Registering..." : "⚡ Light Up the Globe"}
        </button>
      </div>
    </form>
  );
}
