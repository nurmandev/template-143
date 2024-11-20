import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import type {
  TransitionPresentationComponentProps,
  TransitionPresentation,
} from '@remotion/transitions';
import { HEIGHT, WIDTH } from '../lib/consts';

type SplitTransitionProps = {
  directions: (
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'diagonal'
    | 'inverse-diagonal'
    | 'inverse-diagonal-down'
  )[];
  randomDelay?: boolean;
};

const SplitPresentation: React.FC<TransitionPresentationComponentProps<SplitTransitionProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const { directions, randomDelay = true } = passedProps;
  const width = WIDTH;
  const height = HEIGHT;

  // Grid slices for a 2x2 split
  const segmentWidth = width / 2;
  const segmentHeight = height / 2;

  const gridSlices = [
    { finalX: 0, finalY: 0, delay: randomDelay ? 0.0 : 0.0 }, // Top-left, no delay
    { finalX: segmentWidth, finalY: 0, delay: randomDelay ? 0.1 : 0.0 }, // Top-right, slight delay
    { finalX: 0, finalY: segmentHeight, delay: randomDelay ? 0.2 : 0.0 }, // Bottom-left, more delay
    { finalX: segmentWidth, finalY: segmentHeight, delay: randomDelay ? 0.3 : 0.0 }, // Bottom-right, maximum delay
  ];

  const getExitTranslate = (
    direction:
      | 'up'
      | 'down'
      | 'left'
      | 'right'
      | 'diagonal'
      | 'inverse-diagonal'
      | 'inverse-diagonal-down',
    finalX: number,
    finalY: number
  ) => {
    switch (direction) {
      case 'up':
        return { translateX: finalX, translateY: -height };
      case 'down':
        return { translateX: finalX, translateY: height };
      case 'left':
        return { translateX: -width, translateY: finalY };
      case 'right':
        return { translateX: width, translateY: finalY };
      case 'diagonal':
        return { translateX: width, translateY: height };
      case 'inverse-diagonal':
        return { translateX: -width, translateY: height };
      case 'inverse-diagonal-down':
        return { translateX: width, translateY: -height };
      default:
        return { translateX: finalX, translateY: finalY };
    }
  };

  const exitingChildren = presentationDirection === 'exiting' && presentationProgress <= 0.5;
  const enteringChildren = presentationDirection === 'entering' && presentationProgress > 0.5;

  // Memoize styles to avoid re-computation
  const style = useMemo(() => {
    return {
      width: width,
      height: height,
    };
  }, []);

  const renderMirrors = (direction: string, x: number, y: number) => {
    // Compute mirrored positions
    let mirrorX = 0,
      mirrorY = 0,
      scale = '';

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
      case 'diagonal':
        mirrorX = width + x;
        mirrorY = height + y;
        scale = 'scale(-1, -1)';
        break;

      case 'inverse-diagonal':
        mirrorX = -width + x;
        mirrorY = height + y;
        scale = 'scale(-1, -1)';
        break;

      case 'inverse-diagonal-down':
        mirrorX = width + x;
        mirrorY = -height + y;
        scale = 'scale(-1, -1)';
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
        const direction = directions[index] || 'up'; // Use provided direction or default to 'up'

        const { translateX: exitTranslateX, translateY: exitTranslateY } = getExitTranslate(
          direction,
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
            {(exitingChildren || enteringChildren) && (
              <div
                style={{
                  ...style,
                  transform: `translate(${-translateX}px, ${-translateY}px)`,
                }}
              >
                {children}
              </div>
            )}
            {exitingChildren && renderMirrors(direction, -translateX, -translateY)}
            {direction === 'diagonal' &&
              exitingChildren &&
              renderMirrors('down', -translateX, -translateY)}

            {direction === 'diagonal' &&
              exitingChildren &&
              renderMirrors('right', -translateX, -translateY)}

            {direction === 'inverse-diagonal' &&
              exitingChildren &&
              renderMirrors('down', -translateX, -translateY)}

            {direction === 'inverse-diagonal' &&
              exitingChildren &&
              renderMirrors('left', -translateX, -translateY)}

            {direction === 'inverse-diagonal-down' &&
              exitingChildren &&
              renderMirrors('up', -translateX, -translateY)}

            {direction === 'inverse-diagonal-down' &&
              exitingChildren &&
              renderMirrors('right', -translateX, -translateY)}
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
