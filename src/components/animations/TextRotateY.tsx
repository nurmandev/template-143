import { random, useCurrentFrame } from 'remotion'

import { defaultSpring } from '../../lib/helpers';

export const TextRotateY = ({ text, startFrom = 66 }: { text: string; startFrom?: number }) => {
  const frame = useCurrentFrame()
  return (
    <>
      {text.split('\n').map((line, key) => (
        <div key={key} style={{ display: 'flex' }}>
          {line.split('').map((text, i) => (
            <div
              key={i}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${defaultSpring({ frame, delay: startFrom + random(text) * 20, from: 90, to: 0, durationInFrames: 30 })}deg)`,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
