import { useCurrentFrame } from 'remotion'
import { defaultSpring } from '../../lib/helpers';



export const TextLineByLine = ({ text, startFrom = 6 }: { text: string; startFrom?: number }) => {
  const frame = useCurrentFrame()
  return (
    <>
      {text.split('\n').map((text, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <p
            style={{
              transform: `translateY(${defaultSpring({ frame, delay: startFrom + i * 12, from: 100, to: 0 })}%)`,
            }}
          >
            {text}
          </p>
        </div>
      ))}
    </>
  )
}
