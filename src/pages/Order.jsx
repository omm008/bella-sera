import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, CreditCard, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate

const Order = () => {
  const { cart, removeFromCart, clearCart, total } = useCart(); // 2. Get clearCart
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate(); // 3. Init Hook

  // The "Stamp" Trigger
  const handlePayment = (method) => {
    setPaymentMethod(method);
    setTimeout(() => setIsPaid(true), 500);
  };

  // 4. THE REDIRECT LOGIC
  useEffect(() => {
    if (isPaid) {
      // Wait 3 seconds for the user to see the "Stamp" animation
      const timer = setTimeout(() => {
        clearCart(); // Wipe the data
        navigate("/"); // Send them home
      }, 3000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [isPaid, navigate, clearCart]);

  if (cart.length === 0 && !isPaid) {
    return (
      <div className="h-screen bg-sera-cream flex flex-col items-center justify-center text-sera-charcoal">
        <h2 className="text-4xl font-serif mb-4">Your ticket is empty.</h2>
        <Link
          to="/menu"
          className="border-b border-sera-charcoal pb-1 uppercase tracking-widest text-xs"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-200 py-24 px-4 flex justify-center items-start overflow-y-auto">
      {/* THE CHEF'S TICKET */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }} // Smooth exit if we wanted
        className="w-full max-w-md bg-[#FDFBF7] shadow-2xl relative overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(#00000005 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jagged_Edge.svg/1200px-Jagged_Edge.svg.png')] bg-contain opacity-10"></div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center border-b-2 border-dashed border-gray-300 pb-8 mb-8">
            <h1 className="font-serif text-3xl mb-2">BELLA SERA</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
              Table 04 •{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mt-1">
              Ticket #8821
            </p>
          </div>

          {/* List */}
          <div className="space-y-6 min-h-[300px]">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -50, textDecoration: "line-through" }}
                  className="flex justify-between items-start font-mono text-sm group"
                >
                  <div className="flex gap-4">
                    <span className="font-bold">{item.qty}x</span>
                    <div>
                      <span className="block uppercase">{item.name}</span>
                      {item.note && (
                        <span className="text-xs text-gray-400 italic">
                          "{item.note}"
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{item.price}</span>
                    {!isPaid && (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Total */}
          <div className="border-t-2 border-dashed border-gray-300 pt-6 mt-8">
            <div className="flex justify-between font-serif text-2xl">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <p className="font-mono text-[10px] text-gray-400 mt-2 text-center uppercase">
              Includes GST & Service Charge
            </p>
          </div>

          {/* --- PAYMENT ACTIONS --- */}
          {!isPaid ? (
            <div className="mt-12 space-y-4">
              <button
                onClick={() => handlePayment("online")}
                className="w-full bg-black text-white py-4 font-mono uppercase text-xs tracking-[0.2em] hover:bg-sera-red transition-colors flex items-center justify-center gap-3"
              >
                <CreditCard size={16} /> Pay Online
              </button>

              <button
                onClick={() => handlePayment("counter")}
                className="w-full border border-black text-black py-4 font-mono uppercase text-xs tracking-[0.2em] hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <User size={16} /> Pay at Counter
              </button>
            </div>
          ) : (
            // --- THE STAMP ANIMATION ---
            <div className="mt-12 flex flex-col items-center">
              <motion.div
                initial={{ scale: 2, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: -2 }}
                className="border-4 border-sera-red p-4 text-center text-sera-red font-bold font-mono text-xl uppercase tracking-widest opacity-80"
                style={{
                  maskImage:
                    "url(https://upload.wikimedia.org/wikipedia/commons/2/2c/Grunge_texture.png)",
                  maskSize: "cover",
                }}
              >
                {paymentMethod === "online" ? "PAID ONLINE" : "SENT TO KITCHEN"}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs font-mono text-gray-400 mt-4 uppercase tracking-widest"
              >
                Redirecting to Home...
              </motion.p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jagged_Edge.svg/1200px-Jagged_Edge.svg.png')] bg-contain opacity-10 rotate-180"></div>
      </motion.div>
    </div>
  );
};

export default Order;
