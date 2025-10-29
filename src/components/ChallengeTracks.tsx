import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Building2, Shield, Zap, AlertTriangle, Lightbulb, CheckCircle, Trophy, Users } from 'lucide-react';

export function ChallengeTracks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const round1Challenges = [
    {
      icon: Building2,
      title: 'Graph Isolation – Utility Outage Detection',
      description: 'Implement C/C++ algorithm to detect isolated zones when a node (substation/pipeline) fails',
      input: 'Network topology file (nodes, edges)',
      output: 'List of disconnected zones + demand lost',
      color: 'from-blue-500 to-cyan-500',
      teams: '10 teams (~20 students)',
    },
    {
      icon: Shield,
      title: 'Anomaly Detection – Meter Tamper Identification',
      description: 'Implement C/C++ algorithm for anomaly detection in time-series meter readings',
      input: 'Meter readings file',
      output: 'Flagged anomalies with timestamps',
      color: 'from-purple-500 to-pink-500',
      teams: '10 teams (~20 students)',
    },
    {
      icon: Zap,
      title: 'Integration Mini-App',
      description: 'Wrap the C/C++ code into a FastAPI service and create a React UI',
      input: 'CSV upload functionality',
      output: 'Results displayed in table or chart format',
      color: 'from-green-500 to-emerald-500',
      teams: '5 teams (~10 students)',
    },
  ];

  const round2Challenges = [
    {
      icon: Building2,
      title: 'Urban Digital Twin Simulator',
      problem: 'Substation trips → cascading failures across electricity, water, and gas',
      solution: 'Interactive outage simulator with node-click, cascading animation, restore option',
      deliverables: 'C++ graph traversal + FastAPI outage simulation + React map + Postgres topology DB',
      color: 'from-blue-500 to-cyan-500',
      teams: '2 teams',
    },
    {
      icon: Shield,
      title: 'Cross-Utility Fraud & Tamper Radar',
      problem: 'Households tamper meters (electricity zero, but water/gas active)',
      solution: 'Fraud radar dashboard with anomaly scores, comparisons, red flags',
      deliverables: 'C++ anomaly detection + FastAPI fraud API + React dashboard + Postgres readings DB',
      color: 'from-purple-500 to-pink-500',
      teams: '2 teams',
    },
    {
      icon: Zap,
      title: 'Microgrid Optimizer',
      problem: 'EV charging overloads transformers despite available solar & batteries',
      solution: 'Optimizer app for EV + battery scheduling; interactive sliders for solar/battery',
      deliverables: 'C++ optimization logic + FastAPI scheduling API + React line charts + Postgres demand DB',
      color: 'from-yellow-500 to-orange-500',
      teams: '2 teams',
    },
    {
      icon: AlertTriangle,
      title: 'Utility Catastrophe Early-Warning',
      problem: 'Heatwaves cause overloads, bursts, and gas failures',
      solution: 'Risk dashboard with zone-wise heatmap, temperature slider, and drilldown reports',
      deliverables: 'C++ regression/correlation + FastAPI risk scoring API + React heatmap + Postgres weather/incidents DB',
      color: 'from-red-500 to-rose-500',
      teams: '1-2 teams',
    },
    {
      icon: Lightbulb,
      title: 'Smart Consumer Coach',
      problem: 'Consumers struggle with high bills and unclear tariffs',
      solution: 'Bill coach app with tariff comparison, what-if analysis (solar/load shifting)',
      deliverables: 'C++ tariff calculator + FastAPI bill APIs + React bill breakdown + Postgres tariff DB',
      color: 'from-green-500 to-emerald-500',
      teams: '1-2 teams',
    },
  ];

  return (
    <section id="challenges" className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl h-20 sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Challenge Tracks
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Two rounds of challenges designed to test your skills and innovation
          </p>
        </motion.div>

        {/* Round 1 Section */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Round 1 Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 sm:px-6 py-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                1
              </div>
              <span className="text-cyan-300 text-sm sm:text-base font-semibold">Online Screening</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Round 1 – Online Screening
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 text-sm sm:text-base">
              <span className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Duration: 3-4 Days
              </span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="text-gray-400">Test fundamentals & deliver working solutions</span>
            </div>
            
            <div className="inline-block bg-purple-900/30 border border-purple-500/50 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3">
              <p className="text-purple-300 text-xs sm:text-sm font-medium">
                50 Students → 25 Teams → Top 8-10 Teams Advance
              </p>
            </div>
          </div>

          {/* Round 1 Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12">
            {round1Challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full hover:border-cyan-500/60 hover:scale-[1.02] transition-all duration-300 group">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${challenge.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <challenge.icon className="text-white" size={24} />
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">{challenge.title}</h4>

                  <div className="space-y-3">
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{challenge.description}</p>
                    
                    <div className="bg-black/30 rounded-lg p-3 space-y-2">
                      <div>
                        <span className="text-blue-400 text-xs font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          Input
                        </span>
                        <p className="text-gray-400 text-xs mt-1 ml-3">{challenge.input}</p>
                      </div>
                      
                      <div>
                        <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                          Output
                        </span>
                        <p className="text-gray-400 text-xs mt-1 ml-3">{challenge.output}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-700/50 flex items-center gap-2">
                      <Users size={14} className="text-purple-400" />
                      <span className="text-purple-400 text-xs font-semibold">{challenge.teams}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Round 1 Deliverables */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-base sm:text-lg shrink-0">
                  📦
                </span>
                <span>Round 1 Deliverables</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  'C/C++ logic (with input/output format explained)',
                  'FastAPI project with at least 1 endpoint',
                  'React interface for result visualization',
                  '2-3 page write-up (team roles, approach, scaling potential)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3 bg-black/30 rounded-lg p-3">
                    <CheckCircle size={16} className="text-blue-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Round 2 Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Round 2 Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                2
              </div>
              <span className="text-purple-300 text-sm sm:text-base font-semibold">Final Hackathon</span>
            </div>
            
            <h3 className="text-2xl h-20 sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Round 2 – Final Hackathon
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 text-sm sm:text-base">
              <span className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Duration: 24 Hours (Offline)
              </span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="text-gray-400">Build complete working prototypes</span>
            </div>
            
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm">
              <p className="text-purple-300 text-xs sm:text-sm mb-2">
                <strong className="text-purple-200">Story:</strong> A smart city is struggling with energy peaks, water leaks, meter fraud, and rising consumer bills.
              </p>
              <p className="text-purple-200 text-xs leading-relaxed">
                Nxzen has invited the finalists as a City Innovation Task Force to design working prototypes that address these issues.
              </p>
            </div>
          </div>

          {/* Round 2 Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12">
            {round2Challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className={index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
              >
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full hover:border-purple-500/60 hover:scale-[1.02] transition-all duration-300 group">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${challenge.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <challenge.icon className="text-white" size={24} />
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">{challenge.title}</h4>

                  <div className="space-y-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-red-400 text-xs font-semibold flex items-center gap-1 mb-1">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        Problem
                      </span>
                      <p className="text-gray-400 text-xs ml-3 leading-relaxed">{challenge.problem}</p>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-green-400 text-xs font-semibold flex items-center gap-1 mb-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Solution
                      </span>
                      <p className="text-gray-300 text-xs ml-3 leading-relaxed">{challenge.solution}</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-yellow-400 text-xs font-semibold flex items-center gap-1 mb-1">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                        Deliverables
                      </span>
                      <p className="text-gray-400 text-xs ml-3 leading-relaxed">{challenge.deliverables}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-700/50 flex items-center gap-2">
                      <Users size={14} className="text-purple-400" />
                      <span className="text-purple-400 text-xs font-semibold">{challenge.teams}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Round 2 Deliverables */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-base sm:text-lg shrink-0">
                  🚀
                </span>
                <span>Round 2 Deliverables</span>
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Algorithm (C/C++)', desc: 'Core computation logic' },
                  { label: 'Backend (FastAPI)', desc: 'At least 3 endpoints integrating C++ logic' },
                  { label: 'Database (Postgres)', desc: 'Schema + queries' },
                  { label: 'Frontend (React)', desc: 'Dashboard + charts/maps + interactivity' },
                  { label: 'Presentation (6-8 slides)', desc: 'Problem → Solution → Analysis → Impact' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3 bg-black/30 rounded-lg p-3">
                    <CheckCircle size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-white text-xs sm:text-sm font-semibold">{item.label}:</span>
                      <span className="text-gray-300 text-xs sm:text-sm ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Student Flow Summary */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-blue-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Student Flow Summary
            </h4>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0 shadow-lg">
                  1
                </div>
                <div className="flex-1 bg-black/30 rounded-lg p-3 sm:p-4">
                  <p className="text-white font-semibold text-sm sm:text-base mb-1">Round 1 (Online)</p>
                  <p className="text-gray-400 text-xs sm:text-sm">50 students → 25 teams → all submit working outputs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0 shadow-lg">
                  2
                </div>
                <div className="flex-1 bg-black/30 rounded-lg p-3 sm:p-4">
                  <p className="text-white font-semibold text-sm sm:text-base mb-1">Round 2 (Offline)</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Top 8-10 teams (20-30 students) → complete end-to-end prototypes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl shrink-0 shadow-lg">
                  <Trophy size={20} className="text-white" />
                </div>
                <div className="flex-1 bg-black/30 rounded-lg p-3 sm:p-4">
                  <p className="text-white font-semibold text-sm sm:text-base mb-1">Final Demo</p>
                  <p className="text-gray-400 text-xs sm:text-sm">~8-10 working solutions across 5 unique tracks</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}