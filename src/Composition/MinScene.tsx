import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';


export const schema = z.object({});

type Props = z.infer<typeof schema> & { background: BackgroundProps };

const Scene: React.FC<Props> = (props) => {
  return (
    <AbsoluteFill >
      {/* The background component is always the same setup like this.
      Get's it's input from the root */}
      <Background {...props.background} />

        {/* Your Code Here  */}
    </AbsoluteFill>
  );
};

export default Scene;
