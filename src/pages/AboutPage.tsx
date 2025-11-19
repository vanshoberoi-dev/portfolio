import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/Button';
import portfolioData from '@/data/portfolio';
import CertificationsGallery from '@/components/certifications/CertificationsGallery';

export default function AboutPage() {
  const { personal, education, leadership, technologies } = portfolioData;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="About Me" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                I'm a passionate AI Engineer with expertise in Python, Machine Learning, and Web Technologies.
                I enjoy solving complex problems and building innovative solutions that make a difference.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                My journey in technology began during my undergraduate studies, where I developed a strong
                foundation in computer science and engineering principles. Since then, I've been continuously
                learning and expanding my skills in artificial intelligence, machine learning, and web development.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or sharing my knowledge with others through mentoring and technical workshops.
              </p>

              <LinkButton
                href="/resume.pdf"
                variant="primary"
                size="md"
                icon={<FileText size={18} />}
                iconPosition="left"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                View My Resume
              </LinkButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur-xl opacity-20 animate-pulse"></div>
                <img
                  src={personal.image}
                  alt={personal.name}
                  className="w-full max-w-md rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Education" />
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right mt-2 md:mt-0 md:ml-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                      {edu.startDate} - {edu.endDate}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mt-1">
                      {edu.location}
                    </span>
                  </div>
                </div>
                {edu.gpa && (
                  <div className="flex items-center mt-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                )}
                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    {edu.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Voluntary & Other Experiences" />
          <div className="space-y-4">
            {leadership.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card px-6 py-3 max-w-5xl mx-auto"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                    {item.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.organization}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Technologies I Use"
            subtitle="I'm proficient with a wide range of technologies and tools."
            centered
          />

          {/* Technology Clusters with Rainbow Flows */}
          <div className="relative max-w-6xl mx-auto mt-16">
            {/* Enhanced Background Clouds */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
                <defs>
                  <filter id="blur1"><feGaussianBlur stdDeviation="3"/></filter>
                  <filter id="blur2"><feGaussianBlur stdDeviation="6"/></filter>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="g3" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
                  </linearGradient>
                </defs>

                {/* Large overlapping cloud behind AI/ML */}
                <ellipse cx="200" cy="120" rx="180" ry="80" fill="url(#g1)" filter="url(#blur2)" />
                
                {/* Medium cloud behind Backend */}
                <ellipse cx="750" cy="100" rx="120" ry="60" fill="url(#g2)" filter="url(#blur1)" />
                
                {/* Large blurred cloud behind Frontend */}
                <ellipse cx="150" cy="380" rx="200" ry="90" fill="url(#g3)" filter="url(#blur2)" opacity="0.6" />
                
                {/* Medium cloud behind DevOps */}
                <ellipse cx="700" cy="400" rx="140" ry="70" fill="url(#g4)" filter="url(#blur1)" />
                
                {/* Small accent cloud behind Tools */}
                <ellipse cx="500" cy="250" rx="100" ry="50" fill="url(#g1)" opacity="0.4" />
                
                {/* Overlapping background clouds */}
                <ellipse cx="400" cy="150" rx="160" ry="40" fill="url(#g2)" filter="url(#blur2)" opacity="0.3" />
                <ellipse cx="600" cy="300" rx="180" ry="45" fill="url(#g3)" filter="url(#blur2)" opacity="0.25" />
              </svg>
            </div>

            {/* Technology Clusters - Scattered Layout with macOS Dock Effect */}
            <div className="relative z-10 h-[500px] group">

              {/* AI/ML Cluster */}
              <motion.div
                className="absolute text-center tech-cluster"
                style={{ left: '10%', top: '20%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  🧠 AI & Machine Learning
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                  {['Python', 'TensorFlow', 'OpenAI', 'Gemini', 'RAG Pipeline', 'LangChain'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Backend Cluster */}
              <motion.div
                className="absolute text-center tech-cluster"
                style={{ left: '60%', top: '15%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  ⚙️ Backend & APIs
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                  {['Django', 'REST APIs', 'FastAPI', 'PostgreSQL', 'MongoDB'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tools & Others - Center */}
              <motion.div
                className="absolute text-center tech-cluster"
                style={{ left: '35%', top: '45%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  🛠️ Tools & Platforms
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                  {['VS Code', 'Jupyter', 'Postman', 'Figma', 'Streamlit', 'Kaggle'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Frontend Cluster */}
              <motion.div
                className="absolute text-center tech-cluster"
                style={{ left: '5%', top: '70%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  🎨 Frontend & UI
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                  {['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Cloud & DevOps Cluster */}
              <motion.div
                className="absolute text-center tech-cluster"
                style={{ left: '60%', top: '75%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  ☁️ Cloud & DevOps
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                  {['AWS', 'Docker', 'Git', 'GitHub', 'Vercel', 'Linux'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 text-cyan-700 dark:text-cyan-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Certifications Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <CertificationsGallery />
        </div>
      </section>
    </div>
  );
}


