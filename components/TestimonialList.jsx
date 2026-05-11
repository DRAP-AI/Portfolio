"use client";

import { db } from "@/lib/firebase";
import { ref, remove } from "firebase/database";
import { useState } from "react";

export default function TestimonialList({ testimonials, onTestimonialUpdate }) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        setDeleting(id);
        await remove(ref(db, `testimonials/${id}`));
        await onTestimonialUpdate();
      } catch (err) {
        console.error("Error deleting testimonial:", err);
        alert("Failed to delete testimonial");
      } finally {
        setDeleting(null);
      }
    }
  };

  if (testimonials.length === 0) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-700 p-8 rounded-lg text-center">
        <p className="text-zinc-400">No testimonials added yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-zinc-900/50 border border-zinc-700 p-6 rounded-lg hover:border-zinc-600 transition"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <p className="text-sm text-zinc-400 mb-2">{testimonial.role}</p>
                <p className="text-sm text-zinc-300">{testimonial.review}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(testimonial.id)}
              disabled={deleting === testimonial.id}
              className="px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-400 rounded hover:bg-red-600/30 transition disabled:opacity-50 flex-shrink-0"
            >
              {deleting === testimonial.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
