import { Check, ClipboardList, PenTool, Radio, Lightbulb, UserCheck, RefreshCw, Cpu, Layers, Target, Box } from "lucide-react";

const aspects = [
  {
    title: "Tailored Solutions",
    desc: "Programs customized to your organization's goals and challenges.",
    icon: Lightbulb,
  },
  {
    title: "Expert Guidance",
    desc: "Learn from industry leaders with real-world success.",
    icon: UserCheck,
  },
  {
    title: "Innovative Framework",
    desc: "Proprietary methods for impactful, application-driven results.",
    icon: RefreshCw,
  },
  {
    title: "Advanced Technology",
    desc: "State-of-the-art LMS for seamless learning experiences.",
    icon: Cpu,
  },
  {
    title: "Diverse Offerings",
    desc: "Courses across industries, skill levels, and emerging fields.",
    icon: Layers,
  },
  {
    title: "Proven Impact",
    desc: "Trusted by leading organizations for measurable ROI.",
    icon: Target,
  },
  {
    title: "Flexible Delivery",
    desc: "Online and offline options tailored to your needs.",
    icon: Box,
  },
];

const timelineSteps = [
  {
    number: "1",
    title: "Skill Assessment",
    description: "Assess team skill gaps and developmental needs.",
    icon: ClipboardList,
    theme: {
      iconBg: "bg-blue-50 border-blue-100/50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/20",
      topLineGrad: "from-blue-500 to-indigo-500",
      watermark: "group-hover:text-blue-100/30",
    }
  },
  {
    number: "2",
    title: "Tailored Roadmapping",
    description: "Create a tailored roadmap addressing organizational goals.",
    icon: PenTool,
    theme: {
      iconBg: "bg-indigo-50 border-indigo-100/50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20",
      topLineGrad: "from-indigo-500 to-purple-500",
      watermark: "group-hover:text-indigo-100/30",
    }
  },
  {
    number: "3",
    title: "Program Delivery",
    description: "Deliver adaptable programs aligned with industry and organizational needs.",
    icon: Radio,
    theme: {
      iconBg: "bg-emerald-50 border-emerald-100/50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20",
      topLineGrad: "from-emerald-500 to-teal-500",
      watermark: "group-hover:text-emerald-100/30",
    }
  },
];

export default function AccredianEdge() {
  return (
    <section id="accredian-edge" className="py-24 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            The <span className="inline-block font-serif italic font-semibold bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] bg-clip-text text-transparent pb-0.5">Accredian Edge</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-semibold">
            Key Aspects of <span className="text-[#2A75E6]">Our Strategic Training</span>
          </p>
        </div>

        {/* Desktop S-Wave Timeline Layout (hidden on mobile/tablet) */}
        <div className="hidden lg:block relative min-h-[480px] mt-16 px-4">
          {/* SVG Dashed Sine Wave Line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[200px] pointer-events-none overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1400 200" fill="none" preserveAspectRatio="none">
              <path
                d="M 100,100 C 200,135 200,135 300,100 C 400,65 400,65 500,100 C 600,135 600,135 700,100 C 800,65 800,65 900,100 C 1000,135 1000,135 1100,100 C 1200,65 1200,65 1300,100"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              {/* Adding subtle arrows to direct sequence */}
              {[200, 400, 600, 800, 1000, 1200].map((x, idx) => {
                const isEven = idx % 2 === 0;
                const y = isEven ? 117 : 83; // height offset on curves
                return (
                  <path
                    key={idx}
                    d="M -5,-4 L 3,0 L -5,4"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    transform={`translate(${x}, ${y}) rotate(${isEven ? -10 : 10})`}
                  />
                );
              })}
            </svg>
          </div>

          {/* 7 Columns Timeline Row */}
          <div className="grid grid-cols-7 gap-2 relative z-10 w-full">
            {aspects.map((aspect, idx) => {
              const Icon = aspect.icon;
              const isOdd = idx % 2 === 0;
              const isFirst = idx === 0;
              
              return (
                <div key={idx} className="flex flex-col items-center relative w-full h-[400px] justify-center">
                  
                  {/* Center Circle Node */}
                  <div className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                    <div className={`w-14 h-14 rounded-full border-4 border-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 cursor-pointer group ${
                      isFirst 
                        ? "bg-[#2A75E6] text-white hover:bg-blue-600" 
                        : "bg-[#1557B0] text-white hover:bg-blue-800"
                    }`}>
                      <Icon className="w-5 h-5 group-hover:scale-115 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Alternating Text Blocks */}
                  {isOdd ? (
                    <div className="absolute bottom-[58%] flex flex-col items-center text-center px-1.5 w-full">
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 max-w-[170px]">
                        <h4 className="text-[11px] font-black text-slate-800 tracking-wide uppercase mb-1">
                          {aspect.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          {aspect.desc}
                        </p>
                      </div>
                      <div className="w-[1.5px] h-8 bg-blue-300/60 mt-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                  ) : (
                    <div className="absolute top-[58%] flex flex-col items-center text-center px-1.5 w-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <div className="w-[1.5px] h-8 bg-blue-300/60 mb-2" />
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 max-w-[170px]">
                        <h4 className="text-[11px] font-black text-slate-800 tracking-wide uppercase mb-1">
                          {aspect.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          {aspect.desc}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden relative mt-8 pl-6 max-w-xl mx-auto">
          {/* Left Vertical Line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-slate-200" />

          <div className="flex flex-col gap-8">
            {aspects.map((aspect, idx) => {
              const Icon = aspect.icon;
              const isFirst = idx === 0;
              return (
                <div key={idx} className="relative flex items-start gap-4">
                  
                  {/* Node Circle on left */}
                  <div className="absolute -left-6.5 mt-1.5 z-10 flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow flex items-center justify-center ${
                      isFirst ? "bg-[#2A75E6] text-white" : "bg-[#1557B0] text-white"
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Content card on right */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-xs flex-grow text-left">
                    <span className="text-[9px] font-extrabold text-blue-650 uppercase tracking-widest block mb-0.5">
                      Aspect 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-black text-slate-800 mb-1">
                      {aspect.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {aspect.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Delivery Timeline / Process Stepper */}
        <div id="how-it-works" className="scroll-mt-28 bg-gradient-to-br from-slate-100/40 via-white to-blue-50/20 border border-slate-200/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Stepper Headline */}
          <div className="relative mb-14 text-center">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">
              How We <span className="inline-block font-serif italic font-semibold bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] bg-clip-text text-transparent pb-0.5">Deliver Results</span> That Matter?
            </h3>
            <p className="text-sm text-slate-500 font-semibold tracking-wide mt-2">
              A Structured Three-Step Approach to Skill Development
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const t = step.theme;

              return (
                <div key={idx} className="relative flex flex-col h-full">
                  {/* Card Container - No side borders, subtle top accent bar */}
                  <div className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-350 group flex flex-col items-start text-left relative overflow-hidden h-full">
                    
                    {/* Top glow accent line that lights up on hover */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r ${t.topLineGrad} transition-all duration-300`} />

                    {/* Massive watermark number in top right */}
                    <div className={`absolute right-6 top-4 text-7xl font-black text-slate-100/90 select-none transition-colors duration-300 ${t.watermark}`}>
                      0{step.number}
                    </div>

                    {/* Rounded icon box - transitions colors on hover */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-all duration-300 ${t.iconBg}`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
