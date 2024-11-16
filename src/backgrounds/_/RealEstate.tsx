import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { z } from 'zod'

import { colorVar } from '../../lib/helpers'
import { Color } from '../../types'
import { defineBackground } from '../define'

const DEBUG = false
const STROKE_WIDTH = 15

export const RealEstateBackground = defineBackground({
  type: 'real-estate',
  description: '',
  schema: z.object({
    background: Color,
    stroke: Color,
  }),
  component: ({ background, stroke }) => {
    const props = { bgColor: colorVar(background), strokeColor: colorVar(stroke) }
    return (
      <AbsoluteFill
        style={{
          background: colorVar(background),
        }}
      >
        <Element1 {...props} />
        <AnimatedLine {...props} />
        <AnimatedLine2 {...props} />
        <Element3 {...props} />
        <Element4 {...props} />
        <Element5 {...props} />
        <Element6 {...props} />
        <Element7 {...props} />
        <Element8 {...props} />
        <Element9Cross {...props} />
      </AbsoluteFill>
    )
  },
})

const Element1 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 120

  const dashArray = interpolate(progress, [0, 0.4, 1], [20, 160, 320])
  const dashOffset = interpolate(progress, [0, 1], [0, 1200 * 2])
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    >
      <svg
        width="400"
        height="400"
        style={{
          transform: 'scaleX(1)',
          rotate: '-45deg',
          position: 'relative',
          bottom: 0,
          right: 0,
        }}
      >
        <rect
          x="0"
          y="0"
          width="400"
          height="400"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: dashOffset * 0.8,
            strokeDasharray: [dashArray, 400 - dashArray].map((num) => num * 4).join(' '),
          }}
        />
        <rect
          width="400"
          height="400"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [0, 60, 20, 120, 100, 80, 20].map((num) => num * 4).join(' '),
            zIndex: 100,
          }}
        />
        <SvgText text="Element1" />
      </svg>
    </div>
  )
}

const AnimatedLine = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const duration = 60
  const progress = ((frame - 80) % duration) / duration

  const dashOffset = interpolate(progress, [0, 0.25, 0.5, 0.75, 1], [400, 0, 0, -400, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ position: 'absolute', rotate: '-45deg', top: '10%', left: -65 }}>
      <svg width="400" height="50">
        <line
          x1="0"
          y1="25"
          x2="400"
          y2="25"
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH / 2}
          strokeDasharray={400}
          strokeDashoffset={dashOffset}
        />
        <line
          x1="0"
          y1="25"
          x2="400"
          y2="25"
          stroke={bgColor}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={'60, 340'}
          strokeDashoffset={-130}
        />
        <SvgText text="AnimatedLine" />
      </svg>
    </div>
  )
}

const AnimatedLine2 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = (frame % 90) / 90

  const No1y2 = interpolate(
    progress,
    [0, 0.2, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [400, 0, 0, 400, 400, 400],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )
  const No1y1 = interpolate(
    progress,
    [0, 0.3, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [400, 400, 0, 400, 400, 400],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )

  const progress2 = ((frame - 30) % 90) / 90

  const No2y2 = interpolate(
    progress2,
    [0, 0.2, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [650, 0, 0, 650, 650, 650],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )
  const No2y1 = interpolate(
    progress2,
    [0, 0.3, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [650, 650, 0, 650, 650, 650],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )

  return (
    <div
      style={{
        position: 'absolute',
        rotate: '',
        bottom: 0,
        left: -165,
      }}
    >
      <svg
        width="650"
        height="650"
        style={{
          position: 'relative',
          bottom: 0,
          right: 0,
          rotate: '45deg',
          transform: 'translate(-158px, 0)',
        }}
      >
        <line
          x1="120"
          x2="120"
          y1={No1y1}
          y2={No1y2}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH / 2}
          style={{ transform: 'translate(200px, 0)' }}
        />
        {/* dashed line */}
        <line
          x1="120"
          x2="120"
          y1={0}
          y2={650}
          stroke={bgColor}
          style={{ transform: 'translate(200px, 0)' }}
          strokeWidth={STROKE_WIDTH / 2}
          strokeDasharray={[0, 220, 50, 9999].map((num) => num * 1).join(' ')}
        />
        {/* top-left to bottom-right line */}
        <line x1={No2y2} x2={No2y1} y1="120" y2={120} stroke={strokeColor} strokeWidth={STROKE_WIDTH / 2} />
        {/* dashed line */}
        <line
          x1={0}
          x2={650}
          y1="120"
          y2={120}
          stroke={bgColor}
          strokeWidth={STROKE_WIDTH / 2}
          strokeDasharray={[0, 150, 100, 9999].map((num) => num * 1).join(' ')}
        />
        <SvgText text="Element9Cross" />
      </svg>
    </div>
  )
}

const Element3 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 180

  let dashArray
  if (progress <= 0.5) {
    dashArray = interpolate(progress, [0, 0.5], [0, 2200])
  } else {
    dashArray = 2200 - 700
  }

  const dashArrayString =
    progress <= 0.5
      ? [dashArray, 2200 - dashArray].map((num) => num * 1).join(' ')
      : [dashArray, 700].map((num) => num * 1).join(' ')

  const strokeDashOffset = interpolate(progress, [0, 0.51, 1], [0, 0, -2200 + 700])

  return (
    <div
      style={{
        position: 'absolute',
        top: 76,
        right: 179,
      }}
    >
      <svg
        width="400"
        height="700"
        style={{
          transform: 'scaleX(1)',
          rotate: '135deg',
          position: 'relative',
          bottom: 0,
          right: 0,
        }}
      >
        <rect
          x="0"
          y="0"
          width="400"
          height="700"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: strokeDashOffset,
            strokeDasharray: dashArrayString,
          }}
        />
        <rect
          x="0"
          y="0"
          width="400"
          height="700"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [0, 400, 0, 150, 33, 150, 33, 150, 34, 150, 0, 400, 700].map((num) => num * 1).join(' '),
          }}
        />
        <SvgText text="Element3" />
      </svg>
    </div>
  )
}

const Element4 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 120

  let dashArray
  let dashArrayString
  if (progress <= 0.5) {
    dashArray = interpolate(progress, [0, 0.5], [0, 2800], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    dashArrayString = [dashArray, 2800 - dashArray].map((num) => num * 1).join(' ')
  } else {
    dashArrayString = [2100, 700].map((num) => num * 1).join(' ')
  }

  const strokeDashOffset = interpolate(progress, [0, 0.51, 1], [0, 0, -3400 * 1], {
    extrapolateLeft: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        bottom: -20,
        left: 180,
      }}
    >
      <svg
        width="800"
        height="600"
        style={{
          rotate: '45deg',
          position: 'relative',
          bottom: 0,
          right: 0,
          transform: 'scaleX(-1)',
        }}
      >
        <rect
          x="0"
          y="0"
          width="800"
          height="600"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: strokeDashOffset,
            strokeDasharray: dashArrayString,
          }}
        />
        <rect
          width="800"
          height="600"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [0, 500, 80, 220, 0, 150, 50, 150, 50, 200, 0, 200, 50, 550, 600].join(' '),
          }}
        />
        <SvgText text="Element4" />
      </svg>
    </div>
  )
}
const Element5 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 180

  let dashArray
  let dashArrayString
  if (progress <= 0.5) {
    dashArray = interpolate(progress, [0, 0.5], [0, 3000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    dashArrayString = [dashArray, 3000 - dashArray].map((num) => num * 1).join(' ')
  } else {
    dashArrayString = [2100, 900].map((num) => num * 1).join(' ')
  }

  const strokeDashOffset = interpolate(progress, [0, 0.49, 0.5, 1], [0, 0, -900, -900 * 3], {
    extrapolateLeft: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: -80,
        right: 180,
      }}
    >
      <svg
        width="900"
        height="600"
        style={{
          rotate: '45deg',
          transform: 'scaleX(-1)',
          position: 'relative',
          bottom: 0,
          right: 0,
        }}
      >
        <rect
          x="0"
          y="0"
          width="900"
          height="600"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: strokeDashOffset,
            strokeDasharray: dashArrayString,
          }}
        />
        <rect
          width="900"
          height="600"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [900, 450, 50, 100, 0, 300, 50, 550, 0, 100, 50, 450].join(' '),
          }}
        />
        <line
          x1="0"
          x2="0"
          y1={interpolate(progress, [0, 0.05, 0.1], [500, 250, 0])}
          y2={interpolate(progress, [0, 0.05, 0.1], [480, 200, 0])}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
        />
        <SvgText text="Element5" />
      </svg>
    </div>
  )
}

const Element6 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 180

  let dashArray
  let dashArrayString
  if (progress <= 33.33) {
    dashArray = interpolate(progress, [0, 1], [0, 3000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    dashArrayString = [dashArray, 3000 - dashArray].map((num) => num * 1).join(' ')

    dashArrayString = [1800, 1800].map((num) => num * 1).join(' ')
  } else {
    dashArrayString = [2100, 900].map((num) => num * 1).join(' ')
  }

  const strokeDashOffset = interpolate(progress, [0, 1], [0, -3000])

  return (
    <div
      style={{
        position: 'absolute',
        top: 440,
        right: -20,
      }}
    >
      <svg
        width="900"
        height="900"
        style={{
          rotate: '45deg',
          position: 'relative',
          bottom: 0,
          right: 0,
        }}
      >
        <rect
          x="0"
          y="0"
          width="900"
          height="900"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: strokeDashOffset,
            strokeDasharray: dashArrayString,
          }}
        />
        <rect
          width="900"
          height="900"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [900, 0, 900, 900, 0, 100, 100, 300, 100, 99999].join(' '),
          }}
        />
        <SvgText text="Element6" />
      </svg>
    </div>
  )
}

const Element7 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 180

  let dashArray
  let dashArrayString
  if (progress <= 33.33) {
    dashArray = interpolate(progress, [0, 0.5], [0, 1800], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    dashArrayString = [dashArray, 2400 - dashArray].map((num) => num * 1).join(' ')
  } else {
    dashArrayString = [2100, 900].map((num) => num * 1).join(' ')
  }

  const strokeDashOffset = interpolate(progress, [0, 0.5, 1], [1200, 1200, -2400 * 0.7], {
    extrapolateLeft: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        bottom: -120,
        left: `calc(50% - ${600 / 2}px)`,
      }}
    >
      <svg
        width="600"
        height="600"
        style={{
          rotate: '45deg',
          position: 'relative',
          bottom: 0,
          right: 0,
        }}
      >
        <rect
          x="0"
          y="0"
          width="600"
          height="600"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: strokeDashOffset,
            strokeDasharray: dashArrayString,
          }}
        />
        <rect
          width="600"
          height="600"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [
              0, 165, 50, 165, 50, 170, 0, 165, 50, 165, 50, 170, 0, 165, 50, 105, 50, 170, 0, 165, 50, 165, 50, 170,
            ].join(' '),
          }}
        />
        <SvgText text="Element7" />
      </svg>
    </div>
  )
}
const Element8 = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = frame / 180

  let dashArray
  let dashArrayString
  if (progress <= 33.33) {
    dashArray = interpolate(progress, [0, 0.33], [0, 2400], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    dashArrayString = [dashArray, 2400 - dashArray].map((num) => num * 1).join(' ')
    dashArrayString = [1200, 2400 - 1200].map((num) => num * 1).join(' ')
  } else {
    dashArrayString = [2100, 900].map((num) => num * 1).join(' ')
  }

  const strokeDashOffset = interpolate(progress, [0, 1], [3023, -1200 * 1], {
    extrapolateLeft: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: -337,
        left: '4%',
      }}
    >
      <svg
        width="850"
        height="850"
        style={{
          rotate: '45deg',
          position: 'relative',
          bottom: 0,
          right: 0,
        }}
      >
        <rect
          x="0"
          y="0"
          width="850"
          height="850"
          style={{
            stroke: strokeColor,
            strokeWidth: STROKE_WIDTH,
            fill: 'none',
            strokeDashoffset: strokeDashOffset,
            strokeDasharray: dashArrayString,
          }}
        />
        <rect
          width="850"
          height="850"
          style={{
            stroke: bgColor,
            strokeWidth: STROKE_WIDTH * 2,
            fill: 'none',
            strokeDasharray: [0, 650, 100, 100, 0, 550, 100, 200, 850, 0, 850].join(' '),
          }}
        />
        <SvgText text="Element8" />
      </svg>
    </div>
  )
}

const Element9Cross = ({ bgColor, strokeColor }: { bgColor: string; strokeColor: string }) => {
  const frame = useCurrentFrame()
  const progress = (frame % 90) / 90

  const No1y2 = interpolate(
    progress,
    [0, 0.2, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [400, 0, 0, 400, 400, 400],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )
  const No1y1 = interpolate(
    progress,
    [0, 0.3, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [400, 400, 0, 400, 400, 400],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )

  const progress2 = ((frame - 30) % 90) / 90

  const No2y2 = interpolate(
    progress2,
    [0, 0.2, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [400, 0, 0, 400, 400, 400],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )
  const No2y1 = interpolate(
    progress2,
    [0, 0.3, 0.4, 0.41, 0.5, 0.6].map((num) => (num * 10) / 6),
    [400, 400, 0, 400, 400, 400],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  )

  return (
    <div
      style={{
        position: 'absolute',
        top: 96,
        left: 50,
      }}
    >
      <svg
        width="850"
        height="850"
        style={{
          position: 'relative',
          bottom: 0,
          right: 0,
          rotate: '45deg',
        }}
      >
        <line
          x1="100"
          x2="100"
          y1={No1y1}
          y2={No1y2}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH / 2}
          strokeDasharray={400}
        />
        <line
          x1={No2y2}
          x2={No2y1}
          y1="100"
          y2={100}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH / 2}
          strokeDasharray={400}
        />
        <SvgText text="Element9Cross" />
      </svg>
    </div>
  )
}

const SvgText = ({ text }: { text: string }) => {
  if (!DEBUG) return null
  return (
    <text
      x="50%"
      y="50%"
      role={text}
      dominantBaseline="middle"
      textAnchor="middle"
      style={{
        fill: 'red',
        fontSize: '60px',
        zIndex: 200,
      }}
    >
      {text}
    </text>
  )
}
