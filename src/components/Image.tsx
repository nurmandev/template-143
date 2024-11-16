import { Img, interpolate, useCurrentFrame } from 'remotion';

interface ImageProps {
  img: string;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
}

const Image = ({ img, radius, strokeWidth, strokeColor }: ImageProps) => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / 6;
  const gapLength = circumference / 6;

  const rotate = frame / 4;

  const scale = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const imgTop = interpolate(frame, [40, 55], [radius * 2, -100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          borderRadius: '100%',
          width: radius * 2 - strokeWidth,
          height: radius * 2 - strokeWidth,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img
          src={img}
          style={{
            position: 'absolute',
            width: radius * 4,
            top: imgTop,
          }}
        />
      </div>
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

export default Image;
