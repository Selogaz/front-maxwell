'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { usePricing } from '@/hooks/usePricing';

const Pricing: React.FC = () => {
  const { plans, loading, error } = usePricing();

  if (loading) {
    return (
      <Section background="light" id="pricing">
        <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white text-center mb-12">
          Цены
        </h2>
        <div className="text-center text-[#94A3B8]">Загрузка...</div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section background="light" id="pricing">
        <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white text-center mb-12">
          Цены
        </h2>
        <div className="text-center text-red-500">Ошибка: {error}</div>
      </Section>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <Section background="light" id="pricing">
        <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white text-center mb-12">
          Цены
        </h2>
        <p className="text-center text-[#64748B]">Тарифы пока недоступны</p>
      </Section>
    );
  }

  return (
    <Section background="light" id="pricing">
      <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white text-center mb-12">
        Цены
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex flex-col"
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              {plan.name}
            </h3>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.period && (
                <span className="text-[#94A3B8] text-sm ml-1">{plan.period}</span>
              )}
            </div>

            <div className="flex-1 space-y-3 mb-6">
              {plan.features.map((feature, fIndex) => (
                <div key={fIndex} className="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-[#66AAA5]"
                  >
                    <path
                      d="M16.667 5L7.5 14.167L3.333 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[#94A3B8] text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              variant={plan.isCurrent ? 'secondary' : 'primary'}
              className="w-full"
              disabled={plan.isCurrent}
            >
              {plan.isCurrent ? 'Текущий план' : 'Выбрать'}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Pricing;