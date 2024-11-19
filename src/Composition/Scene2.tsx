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

export const scene2Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 100,
    fontWeight: '600',
    letterSpacing: '5px',
    maxLines: 5,
    maxWidth: 1000,
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
        x={WIDTH * 0.89}
        y={HEIGHT * 0.5}
        direction="right"
        size={HEIGHT * 0.85}
        delay={18}
        mirror
        imageY={-HEIGHT * 0.4}
      />

      <DiamondImage x={WIDTH * 0.1} y={0} direction="top" size={HEIGHT * 0.5} delay={20} />
      <DiamondScaleUp x={WIDTH * 0.6} y={HEIGHT * 0.05} size={200} delay={20} />
      <DiamondScaleUp x={WIDTH * 0.65} y={HEIGHT * 0.95} size={300} delay={20} />
      <DiamondScaleUp x={WIDTH * 0.03} y={HEIGHT * 1.02} size={200} delay={20} />

      <AbsoluteFill
        style={{
          left: WIDTH * 0.05,
          top: 'auto',
          bottom: HEIGHT * 0.1,
          height: 700,
          width: 1000,
          alignItems: 'center',
        }}
      >
        <Logo logo={props.logo} delay={15} />
        <div
          style={{
            // width: 1000,
            // height: 80,
            ...titleSplit.style,
            color: colorVar('primaryText'),
          }}
        >
          <TitleTextFromRight startAt={18} text={titleSplit.text} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene2;
