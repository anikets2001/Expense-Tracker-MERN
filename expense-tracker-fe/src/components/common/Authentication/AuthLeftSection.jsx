import React from "react";

const AuthLeftSection = ({ data }) => {
  return (
    <div className="hidden lg:flex flex-col justify-center gap-6 bg-gradient-to-br from-primary to-[#0da141] p-10 text-black">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-4 opacity-90">
          Expense Tracker
        </p>
        <h1 className="text-4xl font-extrabold leading-tight">{data[0]?.h1}</h1>
      </div>

      <div className="space-y-4 text-sm font-medium">
        {data[0]?.features?.map((item, index) => (
          <div key={`${item.title}-${index}`} className="rounded-3xl bg-black/5 p-4">
            <p className="text-black/90 font-bold">{item.title}</p>
            <p className="text-black/70">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthLeftSection;
