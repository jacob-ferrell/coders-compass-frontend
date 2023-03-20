import {useState, useEffect } from 'react';

export default function LoadingAnimation({phrase}) {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
        setDots(prev => {
            if(prev === "...") return "";
            return prev + ".";
        });
    }, 600)

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin w-12 h-12 rounded-full border-t-2 border-b-2 border-purple-500 box-border"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">{phrase}</p>
      <p className="text-3xl">{dots ? dots : <>&nbsp;</>}</p>
    </div>
  );
}
