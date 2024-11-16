import { useCurrentFrame } from 'remotion';

interface CircleProps {
  radius: number;
  strokeWidth: number;
  strokeColor: string;
}

const Circle = ({ radius, strokeWidth, strokeColor }: CircleProps) => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / 6;
  const gapLength = circumference / 6;

  const rotate = frame / 4;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        style={{ position: 'absolute', rotate: `${rotate}deg` }}
      >
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${segmentLength} ${gapLength}`}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Circle;
