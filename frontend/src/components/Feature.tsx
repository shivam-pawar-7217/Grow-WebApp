import React from "react";
import { LineChart, Users, Target, Zap } from "lucide-react";

const features = [
  {
    name: "Analytics",
    description:
      "Get detailed insights into your business growth with our advanced analytics tools.",
    icon: LineChart,
  },
  {
    name: "Team Management",
    description:
      "Efficiently manage and collaborate with your team members in real-time.",
    icon: Users,
  },
  {
    name: "Goal Tracking",
    description:
      "Set and track your business goals with our intuitive goal tracking system.",
    icon: Target,
  },
  {
    name: "Fast Performance",
    description:
      "Experience lightning-fast performance with our optimized platform.",
    icon: Zap,
  },
];

export default function Features() {
  return (
    <div id="features" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful features to help you grow
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of tools and features helps you take your
            business to the next level.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-emerald-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
