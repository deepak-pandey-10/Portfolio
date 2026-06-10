import { Canvas } from "@react-three/fiber";
import { Stars  , CameraControls} from "@react-three/drei";
import GodModel from "../components/GodModel";
import Orbiter from "../components/Orbiter";
import CameraBoundary from "./CameraBoundary";



export default function SpaceScene(){
  return (
    <Canvas
      camera={{ position: [0, 0, 10] }}
      style={{
        width: "110vw",
        height: "110vh",
      }}
    >

      <color attach="background" args={["black"]} />
      <CameraBoundary />


      <ambientLight intensity={0.5} />

      <pointLight
        position={[0, 0, 0]}
        intensity={50}
      />

      

      <Stars
        radius={100}
        depth={100}
        count={10000}
        factor={4}
        fade
      />


      <GodModel />
      {/* <OrbitControls
        enablePan={true}
        enableRotate={true}
        enableZoom={true}
        minDistance={10}
        maxDistance={200}
      /> */}
      <CameraControls
        minDistance={10}

        maxDistance={300}
        mouseButtons={{
          left: 2,   // TRUCK
          right: 2,  // TRUCK
          wheel: 16  // DOLLY
        }}
      />
<Orbiter offset={0} />
<Orbiter offset={(Math.PI * 2) / 10} />
<Orbiter offset={(Math.PI * 4) / 10} />
<Orbiter offset={(Math.PI * 6) / 10} />
<Orbiter offset={(Math.PI * 8) / 10} />
<Orbiter offset={(Math.PI * 10) / 10} />
<Orbiter offset={(Math.PI * 12) / 10} />
<Orbiter offset={(Math.PI * 14) / 10} />
<Orbiter offset={(Math.PI * 16) / 10} />
<Orbiter offset={(Math.PI * 18) / 10} />

    </Canvas >
  );
}
