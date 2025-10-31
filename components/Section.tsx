import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold uppercase text-darkgray dark:text-gray-200 mb-3 pb-2 border-b-2 border-gray-200 dark:border-slate-700">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;