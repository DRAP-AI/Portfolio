"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { testimonialsData } from "@/data/testimonials";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(testimonialsData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const testimonialsRef = ref(db, "testimonials");
                const snapshot = await get(testimonialsRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const testimonialsList = Object.values(data).sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setTestimonials(testimonialsList);
                }
            } catch (err) {
                console.log("Using sample testimonials data");
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <section className="py-16 sm:py-20 md:py-28 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">

                {/* Heading */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-zinc-500 mb-4">
                        Testimonials
                    </p>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                        What Clients Say
                    </h2>

                    <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-400">
                        Real feedback from clients and brands we&apos;ve worked with.
                    </p>
                </div>

                {/* Cards */}
                {testimonials && testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={testimonial.id || index} className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-zinc-700">

                                {/* Quote */}
                                <span className="absolute top-2 right-6 text-[100px] sm:text-[120px] leading-none font-bold text-white/5">
                                    "
                                </span>

                                {/* Review */}
                                <p className="relative z-10 text-sm sm:text-base text-zinc-300 leading-7 sm:leading-8 mb-8 sm:mb-10">
                                    {testimonial.review}
                                </p>

                                {/* User */}
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <img
                                        src={testimonial.avatar || `https://i.pravatar.cc/100?img=${index}`}
                                        alt={testimonial.name}
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="text-sm sm:text-base text-white font-semibold">
                                            {testimonial.name}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-zinc-500">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-zinc-300">No testimonials available</p>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
