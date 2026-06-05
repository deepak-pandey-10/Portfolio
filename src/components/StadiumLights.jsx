export default function StadiumLights() {
  const fieldLength = 150;
  
  return (
    <group>
      <ambientLight intensity={0.4} color="#e0f7fa" />
      <hemisphereLight intensity={0.6} groundColor="#2d5e1e" color="#ffffff" />
      
      {/* Main sun/moon directional light for shadows */}
      <directionalLight
        position={[20, 50, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={150}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={fieldLength}
        shadow-camera-bottom={-10}
      />

      {/* 4 Corner Floodlights */}
      {/* Back Left */}
      <spotLight position={[-20, 30, -10]} angle={0.5} penumbra={0.5} intensity={500} color="#fffae6" />
      {/* Back Right */}
      <spotLight position={[20, 30, -10]} angle={0.5} penumbra={0.5} intensity={500} color="#fffae6" />
      
      {/* Front Left */}
      <spotLight position={[-20, 30, fieldLength]} angle={0.5} penumbra={0.5} intensity={500} color="#fffae6" />
      {/* Front Right */}
      <spotLight position={[20, 30, fieldLength]} angle={0.5} penumbra={0.5} intensity={500} color="#fffae6" />
    </group>
  );
}
