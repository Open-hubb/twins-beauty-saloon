"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useBooking } from "@/context/BookingContext";
import { FlotCheckout } from "@/components/FlotCheckout";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useCart();
  const { setIsBookingOpen, setCartTotal } = useBooking();

  const depositAmount = Math.ceil(totalPrice * 0.3);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[201] flex h-full w-full max-w-md flex-col bg-bg-elevated border-l border-border"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <h2 className="font-[var(--font-display)] text-xl">
                  Your Bag{" "}
                  <span className="text-text-muted">({totalItems})</span>
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:border-accent/50"
                  data-cursor="CLOSE"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 text-5xl">&#10024;</div>
                    <p className="text-text-muted text-sm">
                      Your bag is empty
                    </p>
                    <p className="mt-1 text-text-dim text-xs">
                      Explore our shop to find something beautiful
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 rounded-xl border border-border bg-bg-floating p-3"
                      >
                        <div
                          className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-text-muted">
                              {item.category}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-text-muted hover:border-accent/50"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-medium w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-text-muted hover:border-accent/50"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-accent">
                                Le {(item.price * item.quantity).toLocaleString()}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-text-dim hover:text-rose transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border px-6 py-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-text-muted">Total</span>
                    <span className="text-lg font-medium text-accent">
                      Le {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-4 flex items-center justify-between rounded-lg bg-accent/5 px-3 py-2 border border-accent/10">
                    <span className="text-xs text-text-dim">
                      30% deposit to reserve
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      Le {depositAmount.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setCartTotal(totalPrice);
                      setIsCartOpen(false);
                      setIsBookingOpen(true);
                    }}
                    className="w-full rounded-full bg-accent py-3.5 text-sm font-semibold tracking-[0.1em] text-bg uppercase transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(200,169,126,0.3)]"
                    data-cursor="PAY"
                  >
                    Reserve &amp; Pay Deposit
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FlotCheckout />
    </>
  );
}
