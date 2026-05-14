"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const FLOT_URL = "https://pay.flotme.ai/twinsbeautysaloon";

export function FlotCheckout() {
  const { isCheckoutOpen, setIsCheckoutOpen, clearCart } = useCart();

  const handleClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleComplete = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg h-[85vh] max-h-[700px] rounded-2xl overflow-hidden bg-white shadow-2xl"
          >
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={handleComplete}
                className="rounded-full bg-green-600 px-3 py-1 text-[10px] font-semibold text-white tracking-wider uppercase hover:bg-green-700 transition"
              >
                Done
              </button>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black/60 hover:bg-black/20 transition"
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              src={FLOT_URL}
              className="h-full w-full border-0"
              title="Flot Payment Checkout"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
