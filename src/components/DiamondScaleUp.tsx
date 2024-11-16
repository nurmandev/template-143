import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface DiamondScaleUpProps {
  x: number; // Final horizontal position
  y: number; // Final vertical position
  size?: number; // Final size of the diamond
  delay?: number; // Delay for the animation
  opacity?: number;
}

const DiamondScaleUp: React.FC<DiamondScaleUpProps> = ({
  x,
  y,
  size = 200,
  delay = 0,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  // Interpolate the scale to animate from 0 to 1
  const scale = interpolate(frame, [delay, 40 + delay], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateX = x - size / 2;
  const translateY = y - size / 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: '#0b42b8',
        backgroundSize: 'cover',
        borderRadius: '20%',
        position: 'absolute',
        top: translateY,
        left: translateX,
        transform: `scale(${scale}) rotate(45deg)`,
        transformOrigin: 'center',
        transition: 'transform 0.5s ease',
        opacity,
      }}
    />
  );
};

export default DiamondScaleUp;
