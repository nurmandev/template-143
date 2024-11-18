import React, { PropsWithChildren } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface SplitWrapperProps {
  slides?: 4; // Fixed for a 2x2 grid
}

const SplitWrapper: React.FC<PropsWithChildren<SplitWrapperProps>> = ({ children }) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing configuration
  const delayFrames = 0; // Adjust if needed
  const progress = interpolate(frame - delayFrames, [0, fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dimensions of each grid slice
  const segmentWidth = width / 2;
  const segmentHeight = height / 2;

  // Define the positions for each grid slice
  const gridSlices = [
    { finalX: 0, finalY: 0 }, // Top-left
    { finalX: segmentWidth, finalY: 0 }, // Top-right
    { finalX: 0, finalY: segmentHeight }, // Bottom-left
    { finalX: segmentWidth, finalY: segmentHeight }, // Bottom-right
  ];

  return (
    <AbsoluteFill>
      {gridSlices.map((slice, index) => {
        const { finalX, finalY } = slice;

        // Determine the animation direction per slice
        const translateX = interpolate(progress, [0, 1], [width / 2 - finalX, finalX]);
        const translateY = interpolate(progress, [0, 1], [height / 2 - finalY, finalY]);

        return (
          <div
            key={index}
            style={{
              width: segmentWidth,
              height: segmentHeight,
              overflow: 'hidden',
              position: 'absolute',
              left: finalX,
              top: finalY,
            }}
          >
            {/* Animating content */}
            <div
              style={{
                width: width, // Ensure full content fills the slice
                height: height,
                transform: `translate(${-translateX}px, ${-translateY}px)`, // Content animates within the slice
              }}
            >
              {children}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default SplitWrapper;
