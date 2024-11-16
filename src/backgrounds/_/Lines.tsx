import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { z } from 'zod'

import { colorVar } from '../../lib/helpers'
import { Color } from '../../types'
import { defineBackground } from '../define'

export const LinesBackground = defineBackground({
  type: 'lines',
  description: 'Background with lines that move back and forth',
  schema: z.object({
    background: Color,
    color: Color,
    rotate: z.boolean().optional(),
  }),
  component: ({ rotate, style, background, color }) => {
    const frame = useCurrentFrame()
    const value = Math.sin(frame / 22)
    const getX = (i: number) => {
      const base = -2000 + i * 410
      return interpolate(value, [-1, 1], i % 2 === 0 ? [base, base + 230] : [base + 230, base])
    }

    const getY = (i: number) => {
      const base = 3000 - i * 410
      return interpolate(value, [-1, 1], i % 2 === 0 ? [base, base + 230] : [base + 230, base])
    }

    const xy = new Array(12).fill(0).map((_, i) => ({ x: getX(i), y: getY(i) }))
    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: colorVar(background), ...style }}>
        <svg viewBox="0 0 1000 1000" style={{ width: '100%', height: '100%' }}>
          {new Array(60).fill(0).map((_, i) => {
            const offset = -1400 + i * 50
            return (
              <Line
                key={i}
                color={color}
                xy={xy.map(({ x, y }) => ({ x: x + offset, y: y + offset }))}
                rotate={rotate}
              />
            )
          })}
        </svg>
      </AbsoluteFill>
    )
  },
})

const Line = ({ xy, rotate, color }: { rotate?: boolean; xy: { x: number; y: number }[]; color: Color }) => {
  return (
    <path
      d={xy.map(({ x, y }, i) => (i === 0 ? `M${x} ${y}` : `L${x} ${y}`)).join(' ')}
      stroke={colorVar(color)}
      strokeWidth="4"
      fill="none"
      style={{
        transform: rotate ? 'rotate(90deg)' : undefined,
      }}
    />
  )
}
