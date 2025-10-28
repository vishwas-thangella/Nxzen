import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { Monitor, Trophy, CheckCircle, Code } from 'lucide-react';

export function RoundsOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rounds = [
    {
      icon: Monitor,
      title: 'Round 1 – Online Screening',
      duration: '3-4 Days',
      date: 'November 5-8, 2025',
      description: 'Demonstrate your technical skills through focused challenges',
      tasks: [
        'Graph Isolation Algorithm',
        'Anomaly Detection System',
        'Integration Mini-App',
      ],
      deliverables: [
        'C++ logic implementation',
        'FastAPI backend',
        'React frontend UI',
        'Technical write-up',
      ],
    },
    {
      icon: Trophy,
      title: 'Round 2 – Final Hackathon',
      duration: '24 Hours',
      date: 'November 15-16, 2025 (Offline)',
      description: 'Build complete prototypes for real-world city challenges',
      tasks: [
        'Solve real utility challenges',
        'Build end-to-end solutions',
        'Present to judges',
      ],
      deliverables: [
        'Working prototype',
        'Complete tech stack integration',
        'Live demonstration',
        'Final presentation',
      ],
    },
  ];

  return (
    <section id="rounds" className="py-24 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Competition Rounds
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The hackathon is structured in two rounds to identify and nurture the best talent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {rounds.map((round, index) => (
            <motion.div
              key={round.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/40 p-8 h-full hover:border-purple-500/70 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <round.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white mb-2">{round.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-500/30 border border-purple-500/50 rounded-full text-purple-300 text-sm">
                        {round.duration}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/30 border border-blue-500/50 rounded-full text-blue-300 text-sm">
                        {round.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{round.description}</p>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="text-green-400" size={20} />
                      <h4 className="text-white">Tasks</h4>
                    </div>
                    <ul className="space-y-2 ml-7">
                      {round.tasks.map((task) => (
                        <li key={task} className="text-gray-400 flex items-start gap-2">
                          <span className="text-purple-400">→</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="text-blue-400" size={20} />
                      <h4 className="text-white">Deliverables</h4>
                    </div>
                    <ul className="space-y-2 ml-7">
                      {round.deliverables.map((deliverable) => (
                        <li key={deliverable} className="text-gray-400 flex items-start gap-2">
                          <span className="text-blue-400">→</span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
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
