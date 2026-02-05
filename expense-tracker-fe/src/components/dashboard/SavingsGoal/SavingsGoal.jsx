import React from "react";

const SavingsGoal = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-[#0da141] rounded-xl p-4 md:p-6 text-black shadow-lg shadow-primary/10">
      <h4 className="font-extrabold text-base md:text-lg mb-1">Savings Goal</h4>
      <p className="text-xs md:text-sm font-medium mb-4 md:mb-6 opacity-80">New MacBook Pro 16</p>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <p className="text-xl md:text-2xl font-black">₹1,850 <span className="text-xs md:text-sm font-bold opacity-70">/ ₹2,499</span></p>
          <p className="text-sm font-black">74%</p>
        </div>
        <div className="w-full bg-black/10 rounded-full h-3">
          <div className="bg-black h-3 rounded-full" style={{ width: '74%' }}></div>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wide opacity-80 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">auto_awesome</span>
          Estimated 2 months remaining
        </p>
      </div>
    </section>
  );
};

export default SavingsGoal;