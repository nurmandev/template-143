import { TransitionPresentation } from '@remotion/transitions';
import { useMemo, CSSProperties } from 'react';
import { AbsoluteFill } from 'remotion';

type SlideProps = {
  enterStyle?: CSSProperties;
  exitStyle?: CSSProperties;
};

interface SlidePresentationProps {
  children: React.ReactNode;
  presentationProgress: number;
  presentationDirection: 'entering' | 'exiting';
  passedProps: SlideProps;
}

const SlidePresentation: React.FC<SlidePresentationProps> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps: { enterStyle, exitStyle },
}) => {
  const clipPathStyles = useMemo(() => {
    const progress = presentationProgress * 100;
    const reverseProgress = 100 - progress;

    const calculateClipPath = (
      section: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    ) => {
      if (presentationDirection === 'entering') {
        switch (section) {
          case 'top-left':
            return `polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%)`;
          case 'top-right':
            return `polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)`;
          case 'bottom-left':
            return `polygon(0% 50%, 0% 100%, 50% 100%, 50% 50%)`;
          case 'bottom-right':
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)`;
          default:
            return '';
        }
      }

      // Exiting animation
      switch (section) {
        case 'top-left':
          return `polygon(0% 0%, 0% 100%, ${reverseProgress}% 100%, ${reverseProgress}% 0%)`;
        case 'top-right':
          return `polygon(${reverseProgress}% 0%, 100% 0%, 100% 100%, ${reverseProgress}% 100%)`;
        case 'bottom-left':
          return `polygon(0% 50%, 0% 100%, ${reverseProgress}% 100%, ${reverseProgress}% 50%)`;
        case 'bottom-right':
          return `polygon(${reverseProgress}% 50%, 100% 50%, 100% 100%, ${reverseProgress}% 100%)`;
        default:
          return '';
      }
    };

    return {
      topLeft: calculateClipPath('top-left'),
      topRight: calculateClipPath('top-right'),
      bottomLeft: calculateClipPath('bottom-left'),
      bottomRight: calculateClipPath('bottom-right'),
    };
  }, [presentationProgress, presentationDirection]);

  const style: CSSProperties = useMemo(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      height: '100%',
      ...enterStyle,
      ...(presentationDirection === 'exiting' ? exitStyle : {}),
    };
  }, [presentationDirection, enterStyle, exitStyle]);

  return (
    <AbsoluteFill style={style}>
      {/* Top Left */}
      <div
        style={{
          clipPath: clipPathStyles.topLeft,
          width: '50%',
          height: '50%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
      {/* Top Right */}
      <div
        style={{
          clipPath: clipPathStyles.topRight,
          width: '50%',
          height: '50%',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        {children}
      </div>
      {/* Bottom Left */}
      <div
        style={{
          clipPath: clipPathStyles.bottomLeft,
          width: '50%',
          height: '50%',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        {children}
      </div>
      {/* Bottom Right */}
      <div
        style={{
          clipPath: clipPathStyles.bottomRight,
          width: '50%',
          height: '50%',
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const FourSectionClipSlidePresentation = (
  props?: SlideProps
): TransitionPresentation<SlideProps> => {
  return {
    component: SlidePresentation,
    props: props ?? {},
  };
};
