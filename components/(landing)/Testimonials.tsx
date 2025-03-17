import Image from "next/image";
import React from "react";
import { testimonial } from "@/data/testimonials";

import { Card, CardContent } from "@/components/ui/card";
const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50 dark:bg-muted/10">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonial.map((testimonial, index) => (
            <Card key={index} className="bg-background dark:bg-background/80">
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        width={40}
                        height={40}
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="rounded-full object-cover border-2 border-primary/20 dark:border-primary/40"
                      />
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-primary dark:text-primary/80">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote>
                    <p className="text-muted-foreground dark:text-muted-foreground/80 italic relative">
                      <span className="text-3xl text-primary dark:text-primary/80 absolute -top-4 -left-2">
                        &quot;
                      </span>
                      {testimonial.quote}
                      <span className="text-3xl text-primary dark:text-primary/80 absolute -bottom-4">
                        &quot;
                      </span>
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
