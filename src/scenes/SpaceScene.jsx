import { Canvas } from "@react-three/fiber";
import { Stars  , CameraControls} from "@react-three/drei";
// import GodModel from "../components/GodModel";
// import Orbiter from "../components/Orbiter";
import CameraBoundary from "./CameraBoundary";
import TempleRuins from "../components/TempleRuins";
import CelestialEntity from "../components/CelestialEntity";



export default function SpaceScene(){
  return (
    <Canvas
      camera={{ position: [5, 0, 10] ,
        fov: 90
       }}
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



      <TempleRuins />

      <CameraControls
        minDistance={10}
        maxDistance={50}
        mouseButtons={{
          left: 0,
          right: 0,
          middle: 0,
          wheel: 16, 
        }}
      />
<CelestialEntity />


    </Canvas >
  );
}
