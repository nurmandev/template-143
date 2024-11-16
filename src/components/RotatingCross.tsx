import { useCurrentFrame, useVideoConfig } from 'remotion';

const Cross = ({ color, seed = 10 }: { color: string; seed?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intervalDuration = Math.floor(1 * fps);
  const rotationDuration = Math.floor(0.3 * fps);

  const direction = Math.floor(frame / (intervalDuration + rotationDuration)) % 2 === 0 ? -45 : 45;
  const rotation = direction + 45;

  return (
    <div
      style={{
        width: 100,
        height: 100,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s ease-in-out', // 0.2 second transition for the rotation
        opacity: 0.02,
      }}
    >
      <svg
        width={100}
        height={100}
        viewBox="0 0 40 40"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10 L30 30 M30 10 L10 30"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Cross;
