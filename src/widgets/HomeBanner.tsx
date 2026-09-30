import React from "react";

export function HomeBanner() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] pt-16 relative overflow-hidden bg-gradient-to-br from-[#f8fbea] via-white to-[#edf5f6]">
      {/* Decorative dashed lines and circles in background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute -right-[10%] top-[20%] w-[800px] h-[800px] text-[#dcf088]/40"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content Area */}
        <div className="flex flex-col space-y-8 max-w-2xl">
          {/* Subheading */}
          <div className="flex items-center gap-3 text-[13px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Mountains</span>
            <span className="w-px h-3 bg-slate-300"></span>
            <span>Plains</span>
            <span className="w-px h-3 bg-slate-300"></span>
            <span>Beaches</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-[#144b53] leading-[1.05] tracking-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Spend your <br /> vacation with our <br /> activites & places
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-slate-500 max-w-md leading-relaxed font-medium">
            The traveller where you can select your desired activity and
            destinations of your choice for vacations.
          </p>

          {/* Activity List Section */}
          <div className="pt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Activity List
            </h3>

            <div className="flex flex-wrap gap-5">
              {/* Card 1 */}
              <div className="bg-[#d4e98e] p-3 w-[170px] flex flex-col gap-3 rounded-[32px] rounded-tl-xl rounded-br-xl shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-full h-28 rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80"
                    alt="Beach Walking"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 pb-1">
                  <h4 className="font-extrabold text-[#144b53] text-[15px]">
                    Beach Walking
                  </h4>
                  <p className="text-[11px] font-semibold text-[#144b53]/70 flex items-center gap-1 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    60 people going
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1b636c] p-3 w-[170px] flex flex-col gap-3 rounded-[32px] rounded-bl-xl rounded-tr-xl shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-full h-28 rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&auto=format&fit=crop&q=80"
                    alt="Water Surfing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 pb-1">
                  <h4 className="font-extrabold text-white text-[15px]">
                    Water Surfing
                  </h4>
                  <p className="text-[11px] font-semibold text-white/70 flex items-center gap-1 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    12 people going
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#d4e98e] p-3 w-[170px] flex flex-col gap-3 rounded-[32px] rounded-tl-xl rounded-br-xl shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-full h-28 rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80"
                    alt="Kayaking"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 pb-1">
                  <h4 className="font-extrabold text-[#144b53] text-[15px]">
                    Kayaking
                  </h4>
                  <p className="text-[11px] font-semibold text-[#144b53]/70 flex items-center gap-1 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    31 people going
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area - Image Box */}
        <div className="hidden lg:block relative h-full min-h-[600px] w-full">
          <div className="absolute inset-0 w-full h-full rounded-[64px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80"
              alt="Thailand Destination"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
