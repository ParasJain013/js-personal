'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ContactUs = ({ isOpen, onClose, asModal = false }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errorMsg, setErrorMsg] = useState("");       // New state for errors
    const [successMsg, setSuccessMsg] = useState("");   // New state for success

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");   // Clear error on change
        setSuccessMsg(""); // Clear success on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_PORT}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                const err = data.details ? data.details.join(', ') : data.message || 'Something went wrong';
                setErrorMsg(err);
                return;
            }

            setSuccessMsg(data.message || 'Message sent successfully!');
            setFormData({ name: "", email: "", phone: "", message: "" });

            if (asModal) onClose();

        } catch (err) {
            console.error('Error submitting form:', err);
            setErrorMsg('Failed to send message. Please try again later.');
        }
    };

    const formContent = (
        <div className={`${asModal ? 'bg-white/20' : 'bg-black/20'} relative w-full max-w-md p-6 rounded-2xl shadow-xl dark:bg-white/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-700/50 text-black dark:text-white m-auto mb-8`}>
            
            {asModal && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full 
                        bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/70 dark:hover:bg-gray-700/70
                        transition-colors duration-200 group"
                    aria-label="Close modal"
                >
                    <X size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
                </button>
            )}

            <h2 className="text-2xl font-semibold text-center mb-2">Contact Us</h2>
            <p className="text-sm text-center mb-4">
                Please fill out the form below to get in touch.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black/10 dark:bg-white/10 dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-400
                        focus:outline-none focus:ring-1 focus:ring-accent-1"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black/10 dark:bg-white/10 dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-400
                        focus:outline-none focus:ring-1 focus:ring-accent-1"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black/10 dark:bg-white/10 dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-400
                        focus:outline-none focus:ring-1 focus:ring-accent-1"
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black/10 dark:bg-white/10 dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-400
                        focus:outline-none focus:ring-1 focus:ring-accent-1"
                ></textarea>

                <button
                    type="submit"
                    className="w-full py-3 font-semibold rounded-lg bg-accent-1 hover:bg-accent-2 text-white transition"
                >
                    Send
                </button>

                {/* Inline feedback messages */}
                {errorMsg && <p className="text-red-500 mt-2 text-sm">{errorMsg}</p>}
                {successMsg && <p className="text-green-500 mt-2 text-sm">{successMsg}</p>}
            </form>
        </div>
    );

    if (!asModal) return formContent;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {formContent}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactUs;
