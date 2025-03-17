import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "@/data/features";
import { motion } from "framer-motion";
const FeatureSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background ">
      <div className="container mx-auto px-4 md:px-6">
        <motion.p
          className="text-sm text-center font-extrabold text-blue-700 max-w-2xl mx-auto leading-tight tracking-widest lexend-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.1,
            color: "#2563EB",
            textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
          }}
        >
          FEATURES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tighter text-center mb-12 plus-jakarta-sans-800"
        >
          Powerful Features for your career growth
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto inter-400">
          {features.map((feature, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
              >
                <Card className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="pt-6 flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 mt-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-center">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
