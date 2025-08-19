import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_xe84f32",
        "template_cc4guxs",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "DJgmoRqROrN7B07P7"
      );

      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" }); // reset form
    } catch (error) {
      setStatus("Failed to send message. Try again later.");
      console.error(error);
    } finally {
      if (status === "Message sent successfully!") {
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">
        Have questions? We'd love to hear from you. Fill out the form below to
        get in touch.
      </p>

      <form onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded p-2 resize-none"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
      )}
    </div>
  );
};

export default Contact;
