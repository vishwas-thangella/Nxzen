import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { Building2, Shield, Zap, AlertTriangle, Lightbulb } from 'lucide-react';

export function ChallengeTracks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const challenges = [
    {
      icon: Building2,
      title: 'Urban Digital Twin Simulator',
      problem: 'Cities lack real-time visibility into utility networks',
      solution: 'Build a live digital twin that simulates and monitors city-wide utility systems',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Cross-Utility Fraud & Tamper Radar',
      problem: 'Utility theft and meter tampering cause massive revenue losses',
      solution: 'Create AI-powered detection systems to identify fraud patterns across utilities',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Microgrid Optimizer',
      problem: 'Energy distribution is inefficient and wasteful',
      solution: 'Develop smart algorithms to optimize local energy generation and distribution',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: AlertTriangle,
      title: 'Utility Catastrophe Early-Warning',
      problem: 'Infrastructure failures happen without warning',
      solution: 'Build predictive systems to detect and prevent utility catastrophes before they occur',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: Lightbulb,
      title: 'Smart Consumer Coach',
      problem: 'Consumers waste resources due to lack of insights',
      solution: 'Create AI assistants that help consumers optimize their utility usage and save money',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="challenges" className="py-24 bg-black relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Challenge Tracks
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose your challenge and build innovative solutions for real-world utility problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
            >
              <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 p-6 h-full hover:border-purple-500/60 hover:scale-105 transition-all duration-300 group">
                <div className={`w-14 h-14 bg-gradient-to-br ${challenge.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <challenge.icon className="text-white" size={28} />
                </div>

                <h3 className="text-xl text-white mb-3">{challenge.title}</h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-red-400 text-sm">Problem:</span>
                    <p className="text-gray-400 text-sm mt-1">{challenge.problem}</p>
                  </div>
                  <div>
                    <span className="text-green-400 text-sm">Solution:</span>
                    <p className="text-gray-300 text-sm mt-1">{challenge.solution}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
