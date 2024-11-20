import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface DiamondImageProps {
  img?: string;
  startX: number; // Starting horizontal position
  startY: number; // Starting vertical position
  x: number; // Final horizontal position
  y: number; // Final vertical position
  size?: number; // Size of the diamond
  delay?: number; // Delay for animation
  opacity?: number; // Opacity of the diamond
  mirror?: boolean; // Whether the image should be mirrored horizontally
  imageY?: number; // Offset for the image inside the diamond (vertical)
  imageX?: number; // Offset for the image inside the diamond (horizontal)
}

const DiamondImage: React.FC<DiamondImageProps> = ({
  img,
  startX,
  startY,
  x,
  y,
  size = 200,
  delay = 0,
  opacity = 1,
  mirror = false,
  imageY = 0,
  imageX = 0,
}) => {
  const frame = useCurrentFrame();

  // Interpolate the movement linearly from the starting position to the target position
  const translateX = interpolate(frame - delay, [0, 30], [startX, x - size / 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame - delay, [0, 30], [startY, y - size / 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Interpolate image position for vertical movement
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
        backgroundSize: 'cover',
        borderRadius: '15%',
        position: 'absolute',
        top: translateY, // Move according to the linear interpolation
        left: translateX, // Move according to the linear interpolation
        transform: 'rotate(45deg)', // Diamond shape rotation
        opacity,
        overflow: 'hidden',
      }}
    >
      {img && (
        <div
          style={{
            width: '150%',
            height: '150%',
            transform: `rotate(-45deg) translate(${imageX}px, ${imageY}px) scaleX(${mirror ? '-1' : '1'})`,
          }}
        >
          <img
            src={img}
            alt="diamond"
            style={{
              position: 'absolute',
              top: translateYImage,
              width: '90%',
              height: '90%',
              objectFit: 'cover',
              // objectPosition: 'left top',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DiamondImage;
