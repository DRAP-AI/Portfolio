"use client";

import { useState } from "react";

const AddTestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Testimonial added successfully! 🎉");
        setFormData({ name: "", role: "", review: "", avatar: "" });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add testimonial");
      }
    } catch (err) {
      setError("Error submitting form: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">Add Your Testimonial</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-green transition-colors"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Your Role / Title
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-green transition-colors"
            placeholder="e.g., CEO @Company"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Your Testimonial
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-green transition-colors resize-none"
            placeholder="Share your experience working with us..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Avatar URL (Optional)
          </label>
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-green transition-colors"
            placeholder="https://..."
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green text-black font-bold rounded-lg hover:bg-lightGreen transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
};

export default AddTestimonialForm;
