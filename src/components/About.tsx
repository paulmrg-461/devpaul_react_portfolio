import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    tools: skills.filter(skill => skill.category === 'tools'),
    design: skills.filter(skill => skill.category === 'design')
  };

  const SkillBar: React.FC<{ skill: typeof skills[0] }> = ({ skill }) => (
    <motion.div
      className="mb-6"
      variants={itemVariants}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate developer with 5+ years of experience creating innovative digital solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300">
                  I'm a passionate full-stack developer with over 5 years of experience in creating 
                  beautiful, functional, and user-friendly digital experiences. My journey in tech 
                  started with a curiosity for how things work, which evolved into a deep love for 
                  problem-solving through code.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  I specialize in modern web technologies including React, Node.js, and cloud platforms. 
                  My approach combines technical expertise with creative problem-solving to deliver 
                  solutions that not only work flawlessly but also provide exceptional user experiences.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</h4>
                  <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</h4>
                  <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Skills & Technologies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Frontend</h4>
                  {skillCategories.frontend.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Backend</h4>
                  {skillCategories.backend.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Tools</h4>
                  {skillCategories.tools.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Design</h4>
                  {skillCategories.design.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;