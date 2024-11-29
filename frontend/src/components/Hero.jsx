import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl">
          Grow your business{' '}
          <span className="relative whitespace-nowrap text-emerald-600">
            <Leaf className="absolute -left-8 top-1/2 h-8 w-8 -translate-y-1/2 text-emerald-400" />
            naturally
          </span>{' '}
          with us
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Transform your business with our innovative growth solutions. We help you scale sustainably
          and achieve lasting success.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <button className="group inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Get started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Learn more
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
       
      </div>
    </div>
  );
}