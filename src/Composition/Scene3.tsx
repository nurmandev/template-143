import { AbsoluteFill, Img, staticFile } from 'remotion';

import { z } from 'zod';
import Logo from '../components/Logo';
import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { useTextSplitter } from '../lib/useTextSplitter';
import DiamondImage from '../components/DiamondImage';
import { WIDTH, HEIGHT } from '../lib/consts';
import DiamondScaleUp from '../components/DiamondScaleUp';

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 100,
    fontWeight: '600',
    letterSpacing: '5px',
    maxLines: 4,
    maxWidth: 900,
  });

  return (
    <AbsoluteFill
      style={{
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
        img={props.img}
        x={WIDTH * 0.1}
        y={HEIGHT * 0.5}
        direction="left"
        size={HEIGHT * 0.85}
        delay={20}
        imageY={-HEIGHT * 0.2}
        // imageX={-WIDTH * 0.1}
      />

      <DiamondImage x={WIDTH * 0.55} y={0} direction="top" size={HEIGHT * 0.5} delay={20} />
      <DiamondScaleUp x={WIDTH * 0.95} y={HEIGHT * 0.05} size={200} delay={20} />
      <DiamondScaleUp x={WIDTH * 0.35} y={HEIGHT * 0.95} size={300} delay={20} />
      <DiamondScaleUp x={WIDTH * 0.99} y={HEIGHT * 0.5} size={150} delay={20} />

      <AbsoluteFill
        style={{
          left: WIDTH * 0.45,
          top: 'auto',
          bottom: HEIGHT * 0.05,
          height: 700,
          width: 900,
          alignItems: 'flex-end',
        }}
      >
        <Logo logo={props.logo} delay={15} />
        <div
          style={{
            textAlign: 'right',
            ...titleSplit.style,
            color: colorVar('primaryText'),
          }}
        >
          <TitleTextFromRight startAt={20} text={titleSplit.text} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene3;
