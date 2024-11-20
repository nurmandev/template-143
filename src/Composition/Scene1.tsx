import { AbsoluteFill, Img, staticFile } from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { BackgroundProps } from '../backgrounds';
import Logo from '../components/Logo';
import DiamondImage from '../components/DiamondImage';
import { HEIGHT, WIDTH } from '../lib/consts';
import DiamondScaleUp from '../components/DiamondScaleUp';

export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 80,
    fontWeight: '500',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: WIDTH,
        height: HEIGHT,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill>
        <Img src={staticFile('Media_5.jpeg')} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: '#ff0000e2',
        }}
      />
      <DiamondImage
        x={WIDTH * 0.5}
        y={HEIGHT * 0.5}
        startX={WIDTH * 0.25}
        startY={HEIGHT * 1.12}
        size={HEIGHT * 0.8}
        delay={5}
        opacity={0.6}
      />
      <DiamondImage
        x={WIDTH * 0.85}
        y={HEIGHT * 0.1}
        startX={WIDTH * 1.12}
        startY={HEIGHT * 0.5}
        size={HEIGHT * 0.5}
        delay={20}
        opacity={0.6}
      />
      <DiamondImage
        x={WIDTH * 0.1}
        y={HEIGHT * 0.8}
        startX={-HEIGHT * 0.6}
        startY={HEIGHT * 0.1}
        size={HEIGHT * 0.5}
        delay={18}
        opacity={0.6}
      />

      <DiamondScaleUp x={WIDTH * 0.29} y={HEIGHT * 0.05} size={200} delay={15} opacity={0.6} />
      <DiamondScaleUp x={WIDTH * 0.8} y={HEIGHT * 0.99} size={250} delay={15} opacity={0.6} />
      <Logo delay={15} width={600} logo={props.logo} />

      <div
        style={{
          textAlign: 'center',
          width: 1000,
          height: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...titleSplit.style,
          color: colorVar('primaryText'),
        }}
      >
        <TitleTextFromRight startAt={20} text={titleSplit.text} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene1;
