import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award, Eye, X } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

// Define certification type
interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
  skills: string[];
  description: string;
}

// Real certifications and achievements based on portfolio data
const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Dr\'s Medicine Prescription Prediction - 99% Accuracy',
    issuer: 'Kaggle',
    date: 'December 2024',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://kaggle.com/code/vanshoberoi3103/dr-s-medicine-prescription-prediction-model-99',
    skills: ['Machine Learning', 'Python', 'Healthcare AI', 'Random Forest'],
    description: 'Built a supervised machine learning pipeline achieving 99% accuracy in predicting medical prescriptions based on patient symptoms and demographic data using Random Forest Classifier.'
  },
  {
    id: 'cert-2',
    title: 'Jute Pest Classification - 95% Accuracy',
    issuer: 'Kaggle',
    date: 'November 2024',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://www.kaggle.com/code/vanshoberoi3103/jute-pest-tf-restnet101x1-95-acc-on-1st-try',
    skills: ['TensorFlow', 'Deep Learning', 'Computer Vision', 'AWS'],
    description: 'Fine-tuned TensorFlow ResNet101x1 model to classify 13 jute pest types with 95% accuracy, optimized on AWS m5.large instance with advanced preprocessing techniques.'
  },
  {
    id: 'cert-3',
    title: 'AIML Development Engineer Internship',
    issuer: 'EaseMyMed',
    date: 'December 2024 - June 2025',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://easemymed.com',
    skills: ['Django REST', 'OpenAI', 'Gemini', 'RAG', 'AWS SageMaker'],
    description: 'Developing RESTful APIs using Django, integrating AI technologies including OpenAI and Gemini models, implementing RAG for contextual AI interactions, and deploying on cloud platforms.'
  },
  {
    id: 'cert-4',
    title: 'Neo4j Graph Database Certification',
    issuer: 'Neo4j Workshops',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://neo4j.com/graphacademy/',
    skills: ['GraphDB', 'Cypher', 'GraphRAG', 'Data Retrieval'],
    description: 'Researched and learned GraphDB and GraphRAG concepts through Neo4j workshops, gained proficiency in Cypher query language and understood advantages of GraphDB for accurate data retrieval.'
  },
  {
    id: 'cert-5',
    title: 'Design Team Head Leadership',
    issuer: 'GNDU E-Cell',
    date: 'Spring 2022 – 2023',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://gndu.ac.in/',
    skills: ['Leadership', 'Team Management', 'Design', 'Collaboration'],
    description: 'Led a team of 4 members in creating innovative designs for diverse projects, managed the design team and collaborated with other teams in the entrepreneurship cell.'
  },
  {
    id: 'cert-6',
    title: 'Sports Person Classification - 84.31% Accuracy',
    issuer: 'GitHub Portfolio',
    date: 'September 2024',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://github.com/Vansh462/LearningProjects/tree/main/SportsPersonClassifier',
    skills: ['OpenCV', 'Machine Learning', 'Computer Vision', 'HaarCascades'],
    description: 'Engineered a face-based sports person classifier using HaarCascades and wavelet transforms, achieving 84.31% accuracy with Logistic Regression after systematic hyperparameter optimization.'
  },
  {
    id: 'cert-7',
    title: 'SQL 5-Star Rating',
    issuer: 'HackerRank',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    link: 'https://www.hackerrank.com/',
    skills: ['SQL', 'Database', 'Query Optimization', 'Data Analysis'],
    description: 'Achieved 5-Star rating in SQL on HackerRank, demonstrating proficiency in complex queries, joins, subqueries, and database optimization techniques.'
  },
];

const CertificationsGallery = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full">
      <SectionHeading
        title="Certifications & Achievements"
        subtitle="Professional certifications and learning milestones"
        centered
      />

      <motion.div
        className="mt-12 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCert(cert)}
              whileHover={{ y: -5 }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Eye className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">View Details</p>
                  </div>
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cert.date}</span>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Award className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {cert.title}
                </h3>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm font-medium">
                  View Achievement
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal for Certificate Details */}
      {selectedCert && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-primary-500 mr-3" />
                <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  {selectedCert.issuer}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedCert.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedCert.description}
              </p>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certificate Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">Completion Date</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedCert.date}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="text-sm">Issuing Organization</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedCert.issuer}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedCert.link}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Achievement
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CertificationsGallery;
