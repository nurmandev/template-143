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

export const scene5Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene5Props = z.infer<typeof scene5Schema> & { background: BackgroundProps };

const Scene5: React.FC<Scene5Props> = (props) => {
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
        x={WIDTH * 0.3}
        y={HEIGHT * 0.4}
        startX={WIDTH * 0.3 - HEIGHT * 0.325}
        startY={-HEIGHT * 0.6}
        size={HEIGHT * 0.65}
        delay={18}
        imageY={-HEIGHT * 0.2}
        // imageX={-WIDTH * 0.2}
      />

      <DiamondImage
        x={WIDTH * 0.6}
        y={-HEIGHT * 0.05}
        startX={WIDTH * 0.6 - HEIGHT * 0.25}
        startY={-HEIGHT * 0.65}
        size={HEIGHT * 0.5}
        delay={18}
      />
      <DiamondImage
        x={0}
        y={HEIGHT * 0.9}
        startX={-HEIGHT * 0.65}
        startY={HEIGHT * 0.5}
        size={HEIGHT * 0.6}
        delay={20}
      />
      <DiamondScaleUp x={WIDTH * 0.5} y={HEIGHT * 0.95} size={250} delay={15} />
      <DiamondScaleUp x={WIDTH * 0.93} y={HEIGHT * 0.95} size={400} delay={15} />

      <AbsoluteFill
        style={{
          left: WIDTH * 0.45,
          top: 'auto',
          bottom: HEIGHT * 0.05,
          height: 700,
          width: 900,
          alignItems: 'center',
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

export default Scene5;
