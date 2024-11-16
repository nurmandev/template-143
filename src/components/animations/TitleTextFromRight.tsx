import { Fragment } from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';

export const TitleTextFromRight = ({ text, startAt = 0 }: { text: string; startAt?: number }) => {
  const frame = useCurrentFrame();
  const lines = text.split('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {lines.map((line, lineIndex) => {
        const lineStartFrame = startAt + lineIndex * 10;

        return (
          <p
            key={lineIndex}
            style={{
              margin: 0,
              letterSpacing: 5,
              position: 'relative',
              display: 'inline-block',
              transform: `translateX(${interpolate(
                frame - lineStartFrame,
                [0, 20, 40],
                [-200, 50, 0],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.out(Easing.ease),
                }
              )}px)`,
            }}
          >
            {line.split('').map((char, charIndex) => {
              if (char === ' ') {
                return (
                  <span key={`space-${lineIndex}-${charIndex}`} style={{ display: 'inline-block' }}>
                    &nbsp;
                  </span>
                );
              }
              const charStartFrame = lineStartFrame + charIndex * 2;

              const scale = interpolate(frame - charStartFrame, [0, 10, 15], [0.5, 1.1, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const opacity = interpolate(scale, [0.5, 1], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <Fragment key={`char-${lineIndex}-${charIndex}`}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `scale(${scale})`,
                      opacity,
                    }}
                  >
                    {char}
                  </span>
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
