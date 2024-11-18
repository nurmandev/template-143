import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import type {
  TransitionPresentationComponentProps,
  TransitionPresentation,
} from '@remotion/transitions';
import { HEIGHT, WIDTH } from '../lib/consts';

type SplitTransitionProps = {};

const SplitPresentation: React.FC<TransitionPresentationComponentProps<SplitTransitionProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const width = WIDTH;
  const height = HEIGHT;

  // Grid slices for a 2x2 split
  const segmentWidth = width / 2;
  const segmentHeight = height / 2;

  const gridSlices = [
    { finalX: 0, finalY: 0 }, // Top-left
    { finalX: segmentWidth, finalY: 0 }, // Top-right
    { finalX: 0, finalY: segmentHeight }, // Bottom-left
    { finalX: segmentWidth, finalY: segmentHeight }, // Bottom-right
  ];

  // Split children into exiting and entering groups
  const exitingChildren = presentationDirection === 'exiting' && presentationProgress <= 0.5;
  const enteringChildren = presentationDirection === 'entering' && presentationProgress > 0.5;

  // Memoize styles to avoid re-computation
  const style = useMemo(() => {
    return {
      width: width, // Ensure full content fills the slice
      height: height,
    };
  }, []);

  return (
    <AbsoluteFill>
      {gridSlices.map((slice, index) => {
        const { finalX, finalY } = slice;

        // Animation for entering/exiting
        const translateX = interpolate(
          presentationProgress,
          [0, 1],
          exitingChildren ? [finalX, width / 2 - finalX] : [width / 2 - finalX, finalX],
          {
            easing: Easing.inOut(Easing.cubic),
          }
        );

        const translateY = interpolate(
          presentationProgress,
          [0, 1],
          exitingChildren ? [finalY, height / 2 - finalY] : [height / 2 - finalY, finalY],
          {
            easing: Easing.inOut(Easing.cubic),
          }
        );

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
            {exitingChildren || enteringChildren ? (
              <div
                style={{
                  ...style,
                  transform: `translate(${-translateX}px, ${-translateY}px)`,
                }}
              >
                {children}
              </div>
            ) : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const customSplitTransition = (
  props: SplitTransitionProps
): TransitionPresentation<SplitTransitionProps> => {
  return { component: SplitPresentation, props };
};
