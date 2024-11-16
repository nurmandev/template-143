import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

export const TitleText = ({ text, startAt = 0 }: { text: string; startAt?: number }) => {
  const { durationInFrames, fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, lineIndex) => (
        <p
          key={lineIndex}
          style={{
            margin: 0,
            letterSpacing: 5,
            position: 'relative',
            whiteSpace: 'nowrap',
            left: interpolate(
              (frame - startAt - lineIndex * 5) / (durationInFrames - startAt),
              [0, 0.23, 0.46, 0.7],
              [-15, 15, -5, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            ),
          }}
        >
          {line.split('').map((letter, index) => {
            const globalIndex = lineIndex * line.length + index
            const letterDelay = globalIndex * (fps / 20) // Reduced delay to make the animation faster
            const startFrame = Math.max(0, frame - startAt - letterDelay)
            const opacity = interpolate(startFrame, [0, fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })

            return (
              <span key={index} style={{ opacity }}>
                {letter}
              </span>
            )
          })}
          {lineIndex < lines.length - 1 && <br />}
        </p>
      ))}
    </>
  )
}
