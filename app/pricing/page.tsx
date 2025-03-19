import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  const features = [
    "Unlimited projects",
    "Real-time collaboration",
    "Priority support",
    "Advanced analytics",
    "Custom integrations",
    "API access",
    "Automated backups",
    "Team management",
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl mb-4">
              Simple, Free Forever
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started with Nexus today. No credit card required. No hidden
              fees.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="relative overflow-hidden border-2 border-primary">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg">
                Popular
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Free Plan</CardTitle>
                <CardDescription className="text-xl mt-2">
                  Everything you need to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /month
                  </span>
                </div>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg h-12">Get Started Now</Button>
              </CardFooter>
            </Card>

            <div className="mt-12 text-center space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                Trusted by developers worldwide
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of developers who are already using Nexus to
                build amazing projects. Start your journey today with our
                completely free plan.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Projects Created
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
