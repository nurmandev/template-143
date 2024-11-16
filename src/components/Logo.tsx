import { Img, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface LogoProps {
  logo: string;
  width?: number;
  height?: number;
  delay?: number;
}

const Logo = ({ logo, width = 500, height = 200, delay = 0 }: LogoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define animation duration (in seconds)
  const animationDuration = 1; // 2 seconds

  // Calculate animation progress
  const progress = interpolate(frame - delay, [0, animationDuration * fps], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Top part slides horizontally (left to right)
  const topTranslateX = interpolate(progress, [0, 1], [-width, 0], {
    easing: Easing.out(Easing.ease),
  });

  // Bottom part slides vertically (bottom to center)
  const bottomTranslateY = interpolate(progress, [0, 1], [height, 0], {
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden', // Ensures parts stay within bounds
      }}
    >
      {/* Top part of the image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translateX(${topTranslateX}px)`,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%)', // Top half
        }}
      >
        <Img
          src={logo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Bottom part of the image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${bottomTranslateY}px)`,
          clipPath: 'polygon(0% 60%, 100% 60%, 100% 100%, 0% 100%)', // Bottom half
        }}
      >
        <Img
          src={logo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

export default Logo;
