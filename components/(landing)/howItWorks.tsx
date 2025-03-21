import React from "react";
import { howItWorks } from "@/data/howItWorks";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-background dark:bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background dark:from-primary/10 dark:to-background" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 text-black dark:text-white bg-clip-text"
          >
            How It Works
          </motion.h2>
          <p className="text-muted-foreground dark:text-muted-foreground/90 text-lg">
            Four simple steps to accelerate your career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {howItWorks.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="group relative p-6 rounded-2xl bg-card dark:bg-card/10 hover:bg-card/80 dark:hover:bg-card/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                {index + 1}
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl dark:text-white">
                  {item.title}
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground/90">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
