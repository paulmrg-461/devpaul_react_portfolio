import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShoppingCart, Car, Eye, Users, Pill } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Clients: React.FC = () => {
  const { t } = useLanguage();

  const clients = [
    {
      id: '1',
      name: 'MegaHogar Supermercados',
      icon: ShoppingCart,
      description: 'clients.megahogar.description',
      category: 'Retail'
    },
    {
      id: '2',
      name: 'Grupo Empresarial G&H SAS',
      icon: Building2,
      description: 'clients.gh.description',
      category: 'Empresarial'
    },
    {
      id: '3',
      name: 'CDA Panamericana Popayán',
      icon: Car,
      description: 'clients.cda.description',
      category: 'Automotriz'
    },
    {
      id: '4',
      name: 'Grupo Vista SAS',
      icon: Eye,
      description: 'clients.vista.description',
      category: 'Servicios'
    },
    {
      id: '5',
      name: 'Comunix',
      icon: Users,
      description: 'clients.comunix.description',
      category: 'Tecnología'
    },
    {
      id: '6',
      name: 'Farmacia Jirehfarma',
      icon: Pill,
      description: 'clients.jirehfarma.description',
      category: 'Salud'
    }
  ];

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

  const ClientCard: React.FC<{ client: typeof clients[0] }> = ({ client }) => {
    const IconComponent = client.icon;

    return (
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <IconComponent size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {client.name}
            </h3>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {client.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {t(client.description)}
        </p>
      </motion.div>
    );
  };

  return (
    <section id="clients" className="py-20 bg-white dark:bg-gray-800">
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
              {t('clients.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('clients.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-full">
              <Building2 size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                {t('clients.trustedBy')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;