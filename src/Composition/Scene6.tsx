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

export const scene6Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subtitle: z.string(),
});
type Scene6Props = z.infer<typeof scene6Schema> & { background: BackgroundProps };

const Scene6: React.FC<Scene6Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 60,
    fontWeight: '500',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 800,
  });
  const subtitleSplit = useTextSplitter({
    text: props.subtitle.toUpperCase(),
    fontSize: 60,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 800,
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
        direction="bottom"
        size={HEIGHT * 0.8}
        delay={5}
        opacity={0.6}
      />
      <DiamondImage
        x={WIDTH * 0.9}
        y={HEIGHT * 0.2}
        direction="top"
        size={HEIGHT * 0.5}
        delay={20}
        opacity={0.6}
      />
      <DiamondImage
        x={WIDTH * 0.1}
        y={HEIGHT * 0.8}
        direction="bottom"
        size={HEIGHT * 0.5}
        delay={20}
        opacity={0.6}
      />
      <DiamondScaleUp x={WIDTH * 0.29} y={HEIGHT * 0.05} size={200} delay={15} opacity={0.6} />
      <DiamondScaleUp x={WIDTH * 0.8} y={HEIGHT * 0.99} size={250} delay={15} opacity={0.6} />
      <Logo delay={25} width={600} logo={props.logo} />
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
        <TitleTextFromRight startAt={25} text={titleSplit.text} />
      </div>{' '}
      <div
        style={{
          textAlign: 'center',
          width: 1000,
          height: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...subtitleSplit.style,
          color: colorVar('primaryText'),
        }}
      >
        <TitleTextFromRight startAt={20} text={subtitleSplit.text} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene6;
