import { AbsoluteFill} from 'remotion'
import { z } from 'zod'
import { colorVar } from '../../lib/helpers'
import { Color } from '../../types'
import { defineBackground } from '../define'
import { HEIGHT, WIDTH } from '../../lib/consts';
import Cross from '../../components/RotatingCross';

export const CrossesBackground = defineBackground({
  type: 'crosses',
  description: 'Background with crosses that rotate left and right',
  schema: z.object({
    background: Color,
    stroke: Color,
  }),
  component: ({ style, background, stroke }) => {

    const crossArray = [];

    for (let i = 0; i < WIDTH / 250; i++)
      for (let j = 0; j < HEIGHT / 250; j++) {
        const cross = (
          <div
            style={{
              position: 'absolute',
              left: 250 * i - 50,
              top: 250 * j - 125 * (i % 2) - 50,
            }}
            key={`${i} - ${j}`}
          >
            <Cross color={colorVar(stroke)} seed={Math.random() * 50} />
          </div>
        );

        crossArray.push(cross);
      }

    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: colorVar(background), ...style }}>
        {crossArray}
      </AbsoluteFill>
    );
  }
});

