import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Breathe: React.FC<{}> = () => {
  const [breathingIn, setBreathing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setBreathing(false), 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [])

  return (
    <div 
      className={`breathing ${breathingIn ? 'in' : 'out'}`}
    >
      <span>b</span>
      <span>r</span>
      <span>e</span>
      <span>a</span>
      <span>t</span>
      <span>h</span>
      <span>e</span>
      <span>&nbsp;</span>
      {breathingIn ?
        <>
          <span>i</span>
          <span>n</span>
        </>
      :
        <>
          <span>o</span>
          <span>u</span>
          <span>t</span>
        </>
      }
    </div>
  );
};

export default Breathe;
