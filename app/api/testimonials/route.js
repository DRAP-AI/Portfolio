import { db } from "@/lib/firebase";
import { ref, push, set, get } from "firebase/database";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, review, avatar } = body;

    if (!name || !role || !review) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store the testimonial
    const testimonialsRef = ref(db, "testimonials");

    // Get current testimonials to generate unique ID
    const snapshot = await get(testimonialsRef);
    const testimonials = snapshot.exists() ? snapshot.val() : {};

    const newId = Date.now().toString();
    const newTestimonial = {
      id: newId,
      name,
      role,
      review,
      avatar: avatar || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 100)}`,
      createdAt: new Date().toISOString(),
    };

    await set(ref(db, `testimonials/${newId}`), newTestimonial);

    return Response.json(
      { id: newId, message: "Testimonial added successfully", data: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return Response.json(
      { error: "Failed to add testimonial: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const testimonialsRef = ref(db, "testimonials");
    const snapshot = await get(testimonialsRef);

    if (!snapshot.exists()) {
      return Response.json({ data: [] }, { status: 200 });
    }

    const testimonials = snapshot.val();
    const testimonialsList = Object.values(testimonials);

    return Response.json({ data: testimonialsList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return Response.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
