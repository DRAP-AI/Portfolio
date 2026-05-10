"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaMessage, FaCheck } from "react-icons/fa6";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setEmail("");
      setName("");
      setMessage("");
      setSuccess("Message Sent Successfully");
      setIsSubmitting(false);

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }, 800);
  };

  const inputClasses =
    "h-12 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/50 px-4 text-black placeholder-gray-400 focus:outline-none focus:border-green/50 focus:ring-2 focus:ring-green/20 transition-all duration-300 hover:border-gray-500/70";
  const textareaClasses =
    "rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/50 p-4 text-black placeholder-gray-400 focus:outline-none focus:border-green/50 focus:ring-2 focus:ring-green/20 transition-all duration-300 hover:border-gray-500/70 resize-none";

  return (
    <div className="relative">
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green/10 border border-green/30 rounded-xl flex items-center gap-3"
        >
          <FaCheck className="text-green text-lg" />
          <p className="text-green font-medium">{success}</p>
        </motion.div>
      )}

      <div className="absolute -top-2 -right-2 text-green/20 font-mono text-xs">
        &lt;form&gt;
      </div>
      <div className="absolute -bottom-2 -left-2 text-cyan/20 font-mono text-xs">
        &lt;/form&gt;
      </div>

      <motion.form
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4"
      >
        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="user_name"
            value={name}
            onChange={handleName}
            placeholder="Your name"
            className={`${inputClasses} w-full pl-11`}
            required
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="user_email"
            value={email}
            onChange={handleEmail}
            placeholder="Your email"
            className={`${inputClasses} w-full pl-11`}
            required
          />
        </div>

        <div className="relative">
          <FaMessage className="absolute left-4 top-4 text-gray-400" />
          <textarea
            name="message"
            value={message}
            onChange={handleMessage}
            placeholder="Your message"
            rows={5}
            className={`${textareaClasses} w-full pl-11`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green/80 to-cyan/80 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:from-green hover:to-cyan disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <FaPaperPlane className="text-base transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.form>
    </div>
  );
};

export default ContactForm;
