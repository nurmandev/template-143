const Lamp = () => {
  return (
    <div
      style={{
        width: '1200px',
        height: '1200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(50,50,255,0.3) 10%, rgba(0,0,0,0) 70%)', // Gradient glow
        mixBlendMode: 'screen',
      }}
    ></div>
  );
};

export default Lamp;
