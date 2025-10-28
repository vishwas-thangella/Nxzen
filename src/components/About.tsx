import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Zap, Code, Database, Globe } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Zap,
      title: 'Real-World Impact',
      description: 'Build solutions that address actual utility challenges in modern cities',
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Work with C/C++, FastAPI, React, and PostgreSQL',
    },
    {
      icon: Database,
      title: 'Data-Driven Solutions',
      description: 'Leverage AI and analytics to optimize utility systems',
    },
    {
      icon: Globe,
      title: 'Smart City Vision',
      description: 'Shape the future of efficient, sustainable urban infrastructure',
    },
  ];

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1760978632119-5069b6c9fb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbmV0d29yayUyMGdyaWQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTYzNDM0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Nxzen Hackathon
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nxzen envisions a future where utility systems are intelligent, efficient, and consumer-centric. 
            This national hackathon challenges students to simulate real-world problems and build working 
            prototypes that revolutionize how cities manage electricity, water, and gas distribution. 
            Through this competition, you'll develop practical skills while contributing to the digital 
            transformation of urban infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
