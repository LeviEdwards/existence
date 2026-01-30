'use client';

import { useState, useEffect } from 'react';
import { ExistenceView } from '@/components/ExistenceView';
import { BirthdateInput } from '@/components/BirthdateInput';

export default function Home() {
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for saved birthdate
    const saved = localStorage.getItem('existence-birthdate');
    if (saved) {
      setBirthdate(new Date(saved));
    }
    setIsLoaded(true);
  }, []);

  const handleBirthdateSubmit = (date: Date) => {
    localStorage.setItem('existence-birthdate', date.toISOString());
    setBirthdate(date);
  };

  const handleReset = () => {
    localStorage.removeItem('existence-birthdate');
    setBirthdate(null);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-existence-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!birthdate) {
    return <BirthdateInput onSubmit={handleBirthdateSubmit} />;
  }

  return <ExistenceView birthdate={birthdate} onReset={handleReset} />;
}
