import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Play, Award, Trophy } from 'lucide-react';

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      icon: Calendar,
      title: 'Registration Opens',
      date: 'October 30, 2025',
      description: 'Start forming your teams and register for the hackathon',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Play,
      title: 'Round 1 (Online)',
      date: 'November 5-8, 2025',
      description: '3-4 days to complete online challenges and submit your solutions',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Results Announcement',
      date: 'November 10, 2025',
      description: 'Shortlisted teams for Round 2 will be announced',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Trophy,
      title: 'Round 2 (Offline)',
      date: 'November 15-16, 2025',
      description: '24-hour final hackathon with live presentations and judging',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-gradient-to-b from-purple-950/20 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Event Timeline
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Mark your calendars and prepare for an exciting journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-yellow-500" />

            <div className="space-y-16">
              {events.map((event, index) => (
                <motion.div
                  key={event.title}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300">
                      <h3 className="text-2xl text-white mb-2">{event.title}</h3>
                      <p className="text-purple-300 mb-3">{event.date}</p>
                      <p className="text-gray-400">{event.description}</p>
                    </div>
                  </div>

                  <div className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}>
                    <event.icon className="text-white" size={28} />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-yellow-500" />

            <div className="space-y-12">
              {events.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}>
                    <event.icon className="text-white" size={24} />
                  </div>

                  <div className="flex-1 pt-2">
                    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300">
                      <h3 className="text-xl text-white mb-2">{event.title}</h3>
                      <p className="text-purple-300 mb-3">{event.date}</p>
                      <p className="text-gray-400 text-sm">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
