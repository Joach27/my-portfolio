import React from 'react';

interface SkillBadgeProps {
  skill: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <span className="inline-block bg-mainblue/10 text-mainblue dark:bg-mainblue/20 dark:text-blue-300 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full">
      {skill}
    </span>
  );
};

export default SkillBadge;