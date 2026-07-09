"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const FLOT_BASE = "https://pay.flotme.ai/twinsbeautysaloon";
const ORDER_API = "https://dashboard.flotme.ai/api/public/order";
const MERCHANT_ID = "5d43fac9-9f53-4892-a7f2-817987d9ea5e";

export function FlotCheckout() {
  const { isCheckoutOpen, setIsCheckoutOpen, clearCart, totalPrice, items } = useCart();

  const [step, setStep] = useState<"details" | "pay">("details");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Always start at the details step whenever the checkout opens.
  useEffect(() => {
    if (isCheckoutOpen) { setStep("details"); setError(""); }
  }, [isCheckoutOpen]);

  const depositAmount = Math.ceil(totalPrice * 0.3);
  const flotUrl = depositAmount > 0 ? `${FLOT_BASE}?amount=${depositAmount}` : FLOT_BASE;

  const handleClose = () => setIsCheckoutOpen(false);
  const handleComplete = () => { clearCart(); setIsCheckoutOpen(false); };

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    const { name, phone, address, city } = form;
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    // Capture the order in the Flot dashboard (best-effort — never blocks the sale).
    try {
      await fetch(ORDER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantId: MERCHANT_ID,
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          items: items.map((i) => ({ name: i.name, size: "", qty: i.quantity, price: i.price })),
          total: totalPrice,
          currency: "SLE",
        }),
      });
    } catch {
      /* ignore — proceed to payment */
    }
    setSubmitting(false);
    setStep("pay");
  }

  const inputCls =
    "w-full rounded-lg border border-black/10 px-4 py-3 text-sm text-black placeholder-black/40 focus:border-black/40 outline-none transition";

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center backdrop-blur-md p-4"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.6)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg h-[85vh] max-h-[700px] rounded-2xl overflow-hidden bg-white shadow-2xl"
          >
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              {step === "pay" && (
                <button
                  onClick={handleComplete}
                  className="rounded-full bg-green-600 px-3 py-1 text-[10px] font-semibold text-white tracking-wider uppercase hover:bg-green-700 transition"
                >
                  Done
                </button>
              )}
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black/60 hover:bg-black/20 transition"
              >
                <X size={16} />
              </button>
            </div>

            {step === "details" ? (
              <div className="h-full overflow-y-auto p-6 pt-14">
                <h3 className="text-lg font-semibold text-black">Delivery details</h3>
                <p className="mt-1 text-sm text-black/50">Where should we deliver your order?</p>
                <form onSubmit={submitDetails} className="mt-5 space-y-3">
                  <input className={inputCls} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className={inputCls} placeholder="Phone number" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <input className={inputCls} placeholder="Delivery address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  <input className={inputCls} placeholder="City / Area" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <iframe
                src={flotUrl}
                className="h-full w-full border-0"
                title="Flot Payment Checkout"
                allow="payment"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
