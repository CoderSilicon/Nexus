import React from "react";

const StatsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50 dark:bg-muted/25">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold dark:text-white">50+</h3>
            <p className="text-muted-foreground dark:text-muted-foreground/90">
              Industries Covered
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold dark:text-white">1000+</h3>
            <p className="text-muted-foreground dark:text-muted-foreground/90">
              Interview Questions
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold dark:text-white">95%</h3>
            <p className="text-muted-foreground dark:text-muted-foreground/90">
              Success Rate
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold dark:text-white">24/7</h3>
            <p className="text-muted-foreground dark:text-muted-foreground/90">
              AI Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
