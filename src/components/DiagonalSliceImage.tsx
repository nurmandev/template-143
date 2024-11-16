import React from "react";
import { Easing, Img, interpolate, useCurrentFrame } from "remotion";


interface DiagonalSliceImageProps {
  src: string;
  style?: React.CSSProperties;
  props: any

}

const DiagonalSliceImage: React.FC<DiagonalSliceImageProps> = ({
  src,
  style,
  props
}) => {

  const frame = useCurrentFrame();

  const moveGlassDown = interpolate(frame, [props.glassStart, (props.glassStart + (60 - props.glassSpeed * 2))],
    [-400, 1500], {
      extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  })

  return (

    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
      <svg>
        <filter id="svg-blur">
          <feGaussianBlur stdDeviation={props.glassBlur} />
        </filter>
        <clipPath id="svg-clip">
          <rect x="0" y="0" width={props.glassWidth} height={props.glassHeight + 100}
            style={{ transform: `translate(${props.glassX}px, ${moveGlassDown + props.glassY}px) rotate(-40deg)` }} />
        </clipPath>
      </svg>

      <svg>
        <filter id="svg-blurBig">
          <feGaussianBlur stdDeviation={props.glassBlur} />
        </filter>
        <clipPath id="svg-clipBig">
          <rect x="0" y="0" width={props.glassWidth} height={props.glassHeight}
            style={{ transform: `translate(${props.glassX }px, ${moveGlassDown + props.glassY}px) rotate(-40deg)` }} />
        </clipPath>
      </svg>

      <Img src={src} style={{
        ...style,
        transform: `translate(${props.imgX}px, ${props.imgY}px) scale(${props.imgScale})`,
        position: 'absolute',
      }} />
      <Img src={src} style={{
        ...style,
        transform: `translate(${props.imgX}px, ${props.imgY}px) scale(${1.1})`,
        filter: "url(#svg-blur)",
        clipPath: "url(#svg-clip)",
        position: 'absolute',
      }} />

      <Img src={src} style={{
        ...style,
        transform: `translate(${props.imgX}px, ${props.imgY}px) scale(${1.2})`,
        filter: "url(#svg-blurBig)",
        clipPath: "url(#svg-clipBig)",
        position: 'absolute',
      }} />
    </div>

  );
};

export default DiagonalSliceImage;
