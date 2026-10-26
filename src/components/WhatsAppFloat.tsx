"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      aria-label="Chat with us on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-110"
      data-cursor="CHAT"
    >
      <MessageCircle size={24} className="text-white" />
    </motion.a>
  );
}
