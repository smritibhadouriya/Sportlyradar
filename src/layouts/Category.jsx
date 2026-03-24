import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sports = [
    { label: 'All', path: '/', emoji: null },
    { label: 'Cricket', path: '/cricket', emoji: '🏏' },
    { label: 'Football', path: '/football', emoji: '⚽' },
    { label: 'Badminton', path: '/badminton', emoji: '🏸' },
    { label: 'Tennis', path: '/tennis', emoji: '🎾' },
    { label: 'Formula 1', path: '/f1', emoji: '🏎️' },
  ];

  // Optional: determine active tab based on current URL
  const currentPath = location.pathname;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-4">
      <div className="flex items-center gap-2 flex-wrap">
        {sports.map((sport) => {
          const isActive = 
            sport.path === '/' 
              ? currentPath === '/' 
              : currentPath.startsWith(sport.path);

          return (
            <button
              key={sport.label}
              onClick={() => navigate(sport.path)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? 'bg-[#0d5068] text-white shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-sm backdrop-blur-sm'
                }`}
            >
              {sport.emoji && <span>{sport.emoji}</span>}
              {sport.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Category;