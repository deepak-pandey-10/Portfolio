export default function GoalPost({ position = [0, 0, 135] }) {
  // Regulation goal size roughly: 7.32m wide, 2.44m high
  const width = 7.32;
  const height = 2.44;
  const depth = 2.0;
  const postThickness = 0.12;

  const postMaterial = <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />;
  const netMaterial = <meshStandardMaterial color="#cccccc" wireframe={true} transparent opacity={0.5} />;

  return (
    <group position={position}>
      {/* Left Post */}
      <mesh position={[-width / 2, height / 2, 0]} castShadow>
        <cylinderGeometry args={[postThickness, postThickness, height, 16]} />
        {postMaterial}
      </mesh>
      
      {/* Right Post */}
      <mesh position={[width / 2, height / 2, 0]} castShadow>
        <cylinderGeometry args={[postThickness, postThickness, height, 16]} />
        {postMaterial}
      </mesh>
      
      {/* Crossbar */}
      <mesh position={[0, height, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[postThickness, postThickness, width + postThickness*2, 16]} />
        {postMaterial}
      </mesh>

      {/* Back supports */}
      <mesh position={[-width / 2, height / 2, depth/2]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, Math.sqrt(height*height + depth*depth)]} />
        {postMaterial}
      </mesh>
      <mesh position={[width / 2, height / 2, depth/2]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, Math.sqrt(height*height + depth*depth)]} />
        {postMaterial}
      </mesh>

      {/* Simple Net Representation */}
      <mesh position={[0, height / 2, depth / 2]} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[width, Math.sqrt(height*height + depth*depth)]} />
        {netMaterial}
      </mesh>
    </group>
  );
}
