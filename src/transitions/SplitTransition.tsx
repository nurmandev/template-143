import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import type {
  TransitionPresentationComponentProps,
  TransitionPresentation,
} from '@remotion/transitions';
import { HEIGHT, WIDTH } from '../lib/consts';

type SplitTransitionProps = {
  direction: 'up' | 'down' | 'left' | 'right';
};

const SplitPresentation: React.FC<TransitionPresentationComponentProps<SplitTransitionProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const { direction } = passedProps;
  const width = WIDTH;
  const height = HEIGHT;

  // Grid slices for a 2x2 split
  const segmentWidth = width / 2;
  const segmentHeight = height / 2;

  const gridSlices = [
    { finalX: 0, finalY: 0, delay: 0.0 }, // Top-left, no delay
    { finalX: segmentWidth, finalY: 0, delay: 0.1 }, // Top-right, slight delay
    { finalX: 0, finalY: segmentHeight, delay: 0.2 }, // Bottom-left, more delay
    { finalX: segmentWidth, finalY: segmentHeight, delay: 0.3 }, // Bottom-right, maximum delay
  ];

  // Determine translation direction for exiting children
  const getExitTranslate = (finalX: number, finalY: number) => {
    switch (direction) {
      case 'up':
        return { translateX: finalX, translateY: -height };
      case 'down':
        return { translateX: finalX, translateY: height };
      case 'left':
        return { translateX: -width, translateY: finalY };
      case 'right':
        return { translateX: width, translateY: finalY };
      default:
        return { translateX: finalX, translateY: finalY };
    }
  };

  const exitingChildren = presentationDirection === 'exiting' && presentationProgress <= 0.5;
  const enteringChildren = presentationDirection === 'entering' && presentationProgress > 0.5;

  // Memoize styles to avoid re-computation
  const style = useMemo(() => {
    return {
      width: width, // Ensure full content fills the slice
      height: height,
    };
  }, []);

  const renderMirrors = (slice: { finalX: number; finalY: number }, x: number, y: number) => {
    // Compute mirrored positions
    var mirrorX, mirrorY, scale;

    switch (direction) {
      case 'left':
        mirrorX = -width + x;
        mirrorY = y;
        scale = 'scaleX(-1)';
        break;
      case 'right':
        mirrorX = width + x;
        mirrorY = y;
        scale = 'scaleX(-1)';
        break;
      case 'up':
        mirrorX = x;
        mirrorY = -height + y;
        scale = 'scaleY(-1)';
        break;
      case 'down':
        mirrorX = x;
        mirrorY = height + y;
        scale = 'scaleY(-1)';
        break;

      default:
        mirrorX = -width + x;
        mirrorY = y;
        scale = 'scaleX(-1)';
        break;
    }

    return (
      <div
        style={{
          width: segmentWidth,
          height: segmentHeight,
          overflow: 'hidden',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            ...style,
            transform: `translate(${mirrorX}px, ${mirrorY}px) ${scale}`,
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill>
      {gridSlices.map((slice, index) => {
        const { finalX, finalY, delay } = slice;

        // Compute exiting animation
        const { translateX: exitTranslateX, translateY: exitTranslateY } = getExitTranslate(
          finalX,
          finalY
        );

        const adjustedProgress = Math.max(
          0,
          Math.min(1, (presentationProgress - delay) / (1 - delay))
        );

        const translateX = interpolate(
          adjustedProgress,
          [0, 1],
          exitingChildren ? [finalX, exitTranslateX] : [width / 2 - finalX, finalX],
          {
            easing: Easing.inOut(Easing.cubic),
          }
        );

        const translateY = interpolate(
          adjustedProgress,
          [0, 1],
          exitingChildren ? [finalY, exitTranslateY] : [height / 2 - finalY, finalY],
          {
            easing: Easing.inOut(Easing.cubic),
          }
        );

        return (
          <React.Fragment key={index}>
            {/* Main content */}
            <div
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
                  {/* Mirrored content */}
                </div>
              ) : null}
              {exitingChildren && renderMirrors(slice, -translateX, -translateY)}
            </div>
          </React.Fragment>
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
