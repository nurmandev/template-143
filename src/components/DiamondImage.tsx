import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface DiamondImageProps {
  img?: string;
  x: number; // Final horizontal position
  y: number; // Final vertical position
  direction?: 'top' | 'bottom' | 'left' | 'right'; // Direction to animate from
  size?: number; // Size of the diamond
  delay?: number; // Delay for animation
  opacity?: number;
  mirror?: boolean;
  imageY?: number;
  imageX?: number;
}

const DiamondImage: React.FC<DiamondImageProps> = ({
  img,
  x,
  y,
  direction = 'top',
  size = 200,
  delay = 0,
  opacity = 1,
  mirror = false,
  imageY = 0,
  imageX = 0,
}) => {
  const frame = useCurrentFrame();

  // Set initial off-screen position based on the direction
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'top':
      initialY = -size;
      initialX = x - size / 2;
      break;
    case 'bottom':
      initialY = size * 2;
      initialX = x - size / 2;
      break;
    case 'left':
      initialY = y - size / 2;
      initialX = -size;
      break;
    case 'right':
      initialX = size * 2;
      initialY = y - size / 2;
      break;
  }

  // Interpolate the movement linearly from the initial position to the target position
  const translateX = interpolate(frame - delay, [0, 40], [initialX, x - size / 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame - delay, [0, 40], [initialY, y - size / 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateYImage = interpolate(frame - delay, [0, 40], [-100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: img ? 'transparent' : '#0b42b8', // Default background color
        // backgroundImage: img ? `url(${img})` : undefined, // Apply the image if provided
        backgroundSize: 'cover',
        borderRadius: '15%',
        position: 'absolute',
        top: translateY, // Move according to the linear interpolation
        left: translateX, // Move according to the linear interpolation
        transform: 'rotate(45deg)', // Diamond shape rotation
        transition: 'transform 0.5s ease',
        opacity,
        overflow: 'hidden',
      }}
    >
      {img && (
        <div
          style={{
            width: '150%',
            height: '150%',
            transform: `rotate(-45deg) translate(${imageX}px,${imageY}px) scaleX(${mirror ? '-1' : '1'})`,
          }}
        >
          <img
            src={img}
            alt="diamond"
            style={{
              position: 'absolute',
              top: translateYImage,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'left top',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DiamondImage;
