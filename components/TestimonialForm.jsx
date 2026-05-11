"use client";

import { useState } from "react";

export default function TestimonialForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.name || !formData.role || !formData.review) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      await onSubmit(formData);
      setFormData({ name: "", role: "", review: "", avatar: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-700 p-6 rounded-lg space-y-4 mb-8">
      <h3 className="text-xl font-bold text-white">Add New Testimonial</h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-zinc-300 mb-2">
          Client Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Sarah Wilson"
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-300 mb-2">
          Role/Title *
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          placeholder="e.g., CEO @Company"
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-300 mb-2">
          Testimonial *
        </label>
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Enter the testimonial..."
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white placeholder-zinc-500 focus:outline-none focus:border-white transition resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-300 mb-2">
          Avatar URL (Optional)
        </label>
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green text-black font-bold rounded hover:bg-lightGreen transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Testimonial"}
      </button>
    </form>
  );
}
