import { AbsoluteFill, interpolate, random, staticFile, useCurrentFrame } from 'remotion'
import { z } from 'zod'

import { colorVar } from '../../lib/helpers'
import { Color } from '../../types'
import { defineBackground } from '../define'

const output = [-50, 150]

export const SquaresBackground = defineBackground({
  type: 'squares',
  description: 'Background with a grid that has random flashes on it',
  schema: z.object({ background: Color }),
  component: ({ background, style }) => {
    const frame = useCurrentFrame()
    const x = interpolate(Math.sin(random('1') * 100 + frame * 0.0515), [-1, 1], output)
    const y = interpolate(Math.cos(random('2') * 100 + frame * 0.0523), [-1, 1], output)

    const x2 = interpolate(Math.sin(random('3') * 100 + frame * 0.055), [-1, 1], output)
    const y2 = interpolate(Math.cos(random('4') * 100 + frame * 0.0523), [-1, 1], output)

    const grid = staticFile('/backgrounds/grid.webp')
    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: colorVar(background), ...style }}>
        <RandomFlash seed="1" />
        <RandomFlash seed="2" />
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `radial-gradient(ellipse at ${x}% ${y}%, #FFFFFF, #000000), radial-gradient(ellipse at ${x2}% ${y2}%, #FFFFFF, #000000)`,
            maskImage: `url("${grid}")`,
            WebkitMaskImage: `url("${grid}")`,
          }}
        />
      </AbsoluteFill>
    )
  },
})
const RandomFlash = ({ seed }: { seed: string }) => {
  const frame = useCurrentFrame()
  const x = interpolate(
    Math.sin(random(seed + '5') * 100 + frame * 0.07),
    [-1, 1],
    output.map((x) => x * 2),
  )
  const y = interpolate(
    Math.cos(random(seed + '6') * 100 + frame * 0.07),
    [-1, 1],
    output.map((x) => x * 2),
  )
  const opacity = interpolate(Math.sin(random(seed + '7') * 100 + frame * 0.09), [-1, 1], [0, 1])

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `radial-gradient(ellipse ${800}px ${1000}px at ${x}% ${y}%, #FFFFFF15, transparent)`,
      }}
    />
  )
}
