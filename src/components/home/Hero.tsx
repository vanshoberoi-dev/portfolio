// React and third-party imports
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icon imports
import { ArrowDown, Download, ArrowRight, Code, Brain, Database } from 'lucide-react';
import { BracketsCurly, Lightning, Database as PhDatabase, Code as PhCode } from '@phosphor-icons/react';

// Local component imports
import { Button, LinkButton } from '@/components/ui/Button';

// Data and utility imports
import portfolioData from '@/data/portfolio';
import { HERO_PATTERNS, TECH_LOGOS, PROFILE_IMAGE } from '@/utils/assets';
import { staggerContainer, fadeIn, float, pulse, textContainer, textLetter } from '@/utils/animations';


// Animated text component for letter-by-letter animation
interface AnimatedTextProps {
  text: string;
}

const AnimatedText = ({ text }: AnimatedTextProps) => (
  <motion.span
    variants={textContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="inline-block"
  >
    {Array.from(text).map((letter, index) => (
      <motion.span
        key={`${letter}-${index}`}
        variants={textLetter}
        className="inline-block"
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.span>
);

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden" aria-labelledby="hero-heading" role="banner">
      {/* Content now sits on top of global animated background */}

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeIn('up', 0)} className="mb-4">
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                AI Engineer & ML Specialist
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={fadeIn('up', 0.1)}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-400 dark:text-light-100 mb-6"
            >
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  <AnimatedText text="Vansh Oberoi" />
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-70"></span>
              </span>
            </motion.h1>

            <motion.h2
              variants={fadeIn('up', 0.2)}
              className="text-xl md:text-2xl font-medium text-dark-300/80 dark:text-light-300/80 mb-6"
            >
              Building intelligent solutions with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 font-semibold">
                AI & Machine Learning
              </span>
            </motion.h2>

            <motion.p
              variants={fadeIn('up', 0.3)}
              className="text-lg text-dark-300/70 dark:text-light-300/70 mb-8 max-w-lg"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 font-medium">
                Passionate AI Engineer
              </span>{' '}
              with expertise in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-primary-500 font-medium">
                Python, Machine Learning, and Web Technologies
              </span>
            </motion.p>

            <motion.div
              variants={fadeIn('up', 0.4)}
              className="flex flex-wrap gap-4"
            >
              <LinkButton
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                animate
                className="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
              >
                Get in Touch
              </LinkButton>

              <LinkButton
                href="/resume.pdf"
                variant="outline"
                size="lg"
                icon={<Download size={18} />}
                iconPosition="right"
                animate
                className="backdrop-blur-sm bg-white/30 dark:bg-dark-300/30 hover:bg-white/50 dark:hover:bg-dark-300/50 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </LinkButton>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              variants={fadeIn('up', 0.5)}
              className="mt-12 flex flex-wrap gap-3"
            >
              <span className="text-sm text-dark-300/60 dark:text-light-300/60 mr-2">Tech Stack:</span>
              {['python', 'tensorflow', 'scikit', 'aws', 'docker', 'vscode'].map((tech) => (
                <motion.img
                  key={tech}
                  src={TECH_LOGOS[tech as keyof typeof TECH_LOGOS]}
                  alt={`${tech} programming language or technology icon`}
                  className={`w-6 h-6 object-contain grayscale hover:grayscale-0 transition-all duration-300 ${tech === 'aws' ? 'p-0.5' : ''}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn('left', 0.2)}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>

              {/* Decorative ring */}
              <div className="absolute -inset-4 border-2 border-dashed border-primary-500/30 dark:border-primary-500/20 rounded-full animate-spin-slow"></div>

              {/* Profile image */}
              <img
                src={personal.image}
                alt={`Profile photo of ${personal.name}, AI Engineer and Machine Learning Specialist`}
                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-dark-300 shadow-xl z-10"
                loading="eager"
                fetchpriority="high"
                width="320"
                height="320"
              />

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-dark-200 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-20"
                variants={fadeIn('down', 0.6)}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <Code size={16} className="text-primary-500" />
                <span className="text-primary-600 dark:text-primary-400 font-medium">Python</span>
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <span className="text-primary-600 dark:text-primary-400 font-medium">ML</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-200 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-20"
                variants={fadeIn('up', 0.8)}
                initial="hidden"
                animate="visible"
                whileHover={{ y: 5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <Brain size={16} className="text-secondary-500" />
                <span className="text-secondary-600 dark:text-secondary-400 font-medium">AI</span>
                <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
                <span className="text-secondary-600 dark:text-secondary-400 font-medium">Web</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white dark:bg-dark-200 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-20"
                variants={fadeIn('left', 1)}
                initial="hidden"
                animate="visible"
                whileHover={{ x: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <Database size={16} className="text-primary-500" />
                <span className="text-primary-600 dark:text-primary-400 font-medium">Data</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - Properly centered with container */}
        <motion.div
          variants={fadeIn('up', 1.2)}
          initial="hidden"
          animate="visible"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        >
          <span className="text-dark-300/60 dark:text-light-300/60 mb-2 text-sm">
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="text-primary-500 dark:text-primary-400" size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
