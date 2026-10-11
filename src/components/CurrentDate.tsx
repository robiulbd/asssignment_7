'use client';

import { useState, useEffect } from 'react';

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  
      day: 'numeric',   
      month: 'long',    
      year: 'numeric', 
    };

    const formattedDate = new Intl.DateTimeFormat('bn-BD', options).format(new Date());
    setCurrentDate(formattedDate);
  }, []);

  if (!currentDate) {
    return <span>তারিখ লোড হচ্ছে...</span>;
  }

  return <span>{currentDate}</span>;
}