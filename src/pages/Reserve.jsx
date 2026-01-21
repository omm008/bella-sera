import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// --- MOCK DATA ---
const ZONES = [
  {
    id: "window",
    label: "Window Side",
    tables: [
      { id: 1, seats: 2, status: "available" },
      { id: 2, seats: 2, status: "occupied" },
      { id: 3, seats: 4, status: "available" },
    ],
  },
  {
    id: "main",
    label: "Main Hall",
    tables: [
      { id: 4, seats: 4, status: "available" },
      { id: 5, seats: 6, status: "available" },
      { id: 6, seats: 4, status: "reserved" },
      { id: 7, seats: 2, status: "available" },
    ],
  },
  {
    id: "booth",
    label: "Private Booths",
    tables: [
      { id: 8, seats: 6, status: "available" },
      { id: 9, seats: 6, status: "available" },
    ],
  },
];

// Mock Time Slots
const TIME_SLOTS = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];
const DATES = ["Today", "Tomorrow", "Fri 24", "Sat 25"];

const Reserve = () => {
  const navigate = useNavigate();
  const { setTableId } = useCart();

  // State
  const [mode, setMode] = useState("here"); // 'here' | 'future'
  const [selectedTable, setSelectedTable] = useState(null);

  // Flow State
  const [step, setStep] = useState("select-table"); // 'select-table' | 'select-time' | 'confirmed'
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState(null);

  // --- ACTIONS ---
  const handleTableClick = (table) => {
    if (table.status !== "available") return;
    setSelectedTable(table.id);
    setStep("select-table"); // Reset step if table changes
    setSelectedTime(null);
  };

  const handleMainAction = () => {
    if (mode === "here") {
      // Immediate Connection
      setStep("confirmed");
      setTimeout(() => {
        setTableId(selectedTable);
        navigate("/menu");
      }, 2000);
    } else {
      // Future Booking Flow
      if (step === "select-table") {
        setStep("select-time"); // Open Time Picker
      } else {
        // Finalize Booking
        setStep("confirmed");
        // In real app, send API request here
      }
    }
  };

  return (
    <div className="min-h-screen bg-sera-charcoal text-sera-cream pb-32 relative overflow-hidden">
      {/* --- 1. HEADER & TOGGLE --- */}
      <div className="fixed top-0 left-0 w-full z-40 bg-sera-charcoal/95 backdrop-blur-md border-b border-white/10 pt-6 pb-4 px-6">
        <h1 className="font-serif text-3xl mb-6 text-center">Find Your Spot</h1>

        {/* Toggle Pill */}
        <div className="bg-black/30 p-1 rounded-full flex relative overflow-hidden max-w-xs mx-auto">
          <motion.div
            className="absolute top-1 bottom-1 w-[48%] bg-sera-cream rounded-full z-0"
            animate={{ x: mode === "here" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => {
              setMode("here");
              setStep("select-table");
            }}
            className={`flex-1 relative z-10 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${mode === "here" ? "text-sera-charcoal" : "text-gray-400"}`}
          >
            I'm Here
          </button>
          <button
            onClick={() => {
              setMode("future");
              setStep("select-table");
            }}
            className={`flex-1 relative z-10 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${mode === "future" ? "text-sera-charcoal" : "text-gray-400"}`}
          >
            Reserve
          </button>
        </div>
      </div>

      {/* --- 2. THE MAP --- */}
      <div className="pt-40 px-6 space-y-12 max-w-md mx-auto">
        <p className="text-center text-gray-400 text-sm font-sans">
          {mode === "here"
            ? "Tap your current table."
            : "Select a table to book."}
        </p>

        {ZONES.map((zone) => (
          <div key={zone.id}>
            <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-sera-stone mb-6 flex items-center gap-4">
              <span className="w-full h-px bg-white/10"></span>
              <span className="whitespace-nowrap">{zone.label}</span>
              <span className="w-full h-px bg-white/10"></span>
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {zone.tables.map((table) => {
                const isSelected = selectedTable === table.id;
                const isTaken = table.status !== "available";
                return (
                  <button
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    disabled={isTaken}
                    className={`relative group flex flex-col items-center gap-3 transition-all duration-300 ${isTaken ? "opacity-30 grayscale cursor-not-allowed" : "opacity-100"}`}
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl border transition-all duration-300 flex items-center justify-center relative ${isSelected ? "bg-sera-red border-sera-red text-white scale-110 shadow-[0_0_30px_rgba(185,54,39,0.4)]" : "bg-transparent border-white/20 text-gray-500 hover:border-white/50"}`}
                    >
                      {[...Array(table.seats)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1.5 h-1.5 rounded-full bg-current ${i === 0 ? "-top-3" : i === 1 ? "-bottom-3" : i === 2 ? "-left-3" : "-right-3"} ${i > 3 ? "hidden" : ""}`}
                        />
                      ))}
                      <span className="font-serif text-xl">{table.id}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-sans opacity-60">
                      {isTaken ? "Taken" : `${table.seats} Seats`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* --- 3. BOTTOM SHEET (Dynamic Height) --- */}
      <AnimatePresence>
        {selectedTable && step !== "confirmed" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full bg-sera-cream text-sera-charcoal rounded-t-3xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="p-6">
              {/* Header Info */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Selected
                  </p>
                  <h2 className="text-3xl font-serif">Table {selectedTable}</h2>
                </div>
                {mode === "future" && step === "select-time" && (
                  <button
                    onClick={() => setStep("select-table")}
                    className="text-xs uppercase underline text-gray-400"
                  >
                    Change Table
                  </button>
                )}
              </div>

              {/* --- TIME SLOT PICKER (Only shows in 'future' mode + step 2) --- */}
              {mode === "future" && step === "select-time" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-8 border-t border-dashed border-gray-300 pt-6"
                >
                  {/* Date Scroller */}
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-6 pb-2">
                    {DATES.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${selectedDate === date ? "bg-sera-charcoal text-white border-sera-charcoal" : "border-gray-300 text-gray-400"}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>

                  {/* Time Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-lg text-sm font-serif transition-all ${selectedTime === time ? "bg-sera-red text-white shadow-lg scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Main Button */}
              <button
                onClick={handleMainAction}
                disabled={
                  mode === "future" && step === "select-time" && !selectedTime
                }
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300
                  ${
                    mode === "future" && step === "select-time" && !selectedTime
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-sera-charcoal text-white hover:bg-sera-red shadow-xl"
                  }
                `}
              >
                {mode === "here"
                  ? "Connect & Order"
                  : step === "select-table"
                    ? "Check Availability"
                    : "Confirm Booking"}
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 4. CONFIRMATION OVERLAY --- */}
      {/* --- 4. CONFIRMATION OVERLAY (With Pre-order Logic) --- */}
      <AnimatePresence>
        {step === "confirmed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`fixed inset-0 z-[60] ${mode === "here" ? "bg-sera-red" : "bg-sera-charcoal"} flex items-center justify-center text-white px-6`}
          >
            <div className="text-center w-full max-w-sm">
              {/* Icon Animation */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {mode === "here" ? (
                  <CheckCircle size={80} className="mx-auto mb-6" />
                ) : (
                  <Calendar size={80} className="mx-auto mb-6" />
                )}
              </motion.div>

              {/* Main Text */}
              <h2 className="text-4xl font-serif mb-4">
                {mode === "here" ? "Connected." : "Confirmed."}
              </h2>

              {mode === "here" ? (
                <p className="text-lg opacity-90 font-sans tracking-wide">
                  Table {selectedTable} is active.
                </p>
              ) : (
                <div className="font-sans opacity-90 space-y-1 text-lg mb-10">
                  <p>Table {selectedTable} Reserved</p>
                  <p className="font-bold text-sera-red">
                    {selectedDate} at {selectedTime}
                  </p>
                </div>
              )}

              {/* --- PRE-ORDER AREA (Only for Future Bookings) --- */}
              {mode === "future" && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl relative overflow-hidden"
                >
                  {/* Shiny gradient effect */}
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-sera-red/30 blur-2xl rounded-full"></div>

                  <p className="font-serif text-2xl mb-2 relative z-10">
                    Hungry already?
                  </p>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 relative z-10">
                    Pre-order your favorites now. We will fire the kitchen 15
                    mins before you arrive.
                  </p>

                  <div className="space-y-3 relative z-10">
                    {/* Primary Action: Go to Menu */}
                    <button
                      onClick={() => navigate("/menu")}
                      className="w-full py-3 bg-white text-sera-charcoal rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-sera-red hover:text-white transition-all duration-300 shadow-lg"
                    >
                      Browse Menu
                    </button>

                    {/* Secondary Action: Go Home */}
                    <button
                      onClick={() => navigate("/")}
                      className="w-full py-3 text-gray-400 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors"
                    >
                      Maybe Later
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reserve;
