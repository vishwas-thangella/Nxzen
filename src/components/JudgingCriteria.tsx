import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Progress } from './ui/progress';
import { Code2, Server, Database, Palette, Lightbulb } from 'lucide-react';

export function JudgingCriteria() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const criteria = [
    {
      icon: Code2,
      name: 'Algorithm (C/C++)',
      points: 25,
      description: 'Code quality, efficiency, and problem-solving approach',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Server,
      name: 'API & Integration (Python)',
      points: 25,
      description: 'Backend architecture, FastAPI implementation, and integration',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Database,
      name: 'Database (PostgreSQL)',
      points: 15,
      description: 'Data modeling, query optimization, and schema design',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Palette,
      name: 'Frontend (React)',
      points: 15,
      description: 'UI/UX design, responsiveness, and user experience',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      icon: Lightbulb,
      name: 'Innovation & Storytelling',
      points: 20,
      description: 'Creativity, impact, presentation, and problem solution fit',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Judging Criteria
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your submissions will be evaluated across five key dimensions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {criteria.map((criterion, index) => (
            <motion.div
              key={criterion.name}
              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${criterion.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <criterion.icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl text-white">{criterion.name}</h3>
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {/* {criterion.points} pts */}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{criterion.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-purple-500/50 rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-gray-300">
              All criteria combined determine your final score and ranking
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
