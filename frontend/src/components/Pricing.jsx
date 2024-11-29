import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    features: [
      'Basic analytics',
      'Up to 5 team members',
      'Basic goal tracking',
      'Email support'
    ]
  },
  {
    name: 'Professional',
    price: 99,
    features: [
      'Advanced analytics',
      'Up to 20 team members',
      'Advanced goal tracking',
      'Priority support',
      'Custom reporting',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 299,
    features: [
      'Full analytics suite',
      'Unlimited team members',
      'Advanced goal tracking',
      '24/7 priority support',
      'Custom integrations',
      'Dedicated account manager'
    ]
  }
];

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose the perfect plan for your business
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Perfect for {tier.name.toLowerCase()} businesses looking to grow.
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">${tier.price}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-emerald-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-8 block rounded-full bg-emerald-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
