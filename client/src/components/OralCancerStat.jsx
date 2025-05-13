import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import "../styles/global.css";

const OralCancerStats = () => {
  const stats = [
    {
      count: 2556,
      label: 'New cases in the Sri Lanka in 2022',
      delay: 0.1,
    },
    {
      count: 1198,
      label: 'lives were lostto Mouth Cancer in 2020',
      delay: 0.3,
    },
    {
       
      count: 650000,
      label: 'Oral Cancer people affects per year worldwide',
      delay: 0.5,
    },

  ];

  return (
    <div className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            className="stat-item"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: stat.delay, duration: 0.6 }}
          >
            <h1>
              <CountUp end={stat.count} duration={2} />
            </h1>
            <h5>{stat.label}</h5>
          </motion.div>
        ))}
      </div>
    </div>
    
  );
};

export default OralCancerStats;



