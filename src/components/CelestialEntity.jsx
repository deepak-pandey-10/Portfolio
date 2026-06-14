import GodModel from "./GodModel";
import Orbiter from "./Orbiter";

export default function CelestialEntity({
  onShowAbout,
}) {
  return (
    <group position={[0, 0, 0]}>
      <group>
        <GodModel
          onClick={(e) => {
            e.stopPropagation();
            onShowAbout();
          }}
        />

        {Array.from({ length: 10 }).map(
          (_, i) => (
            <Orbiter
              key={i}
              radius={6}
              speed={0.3}
              offset={
                (Math.PI * 2 * i) / 10
              }
            />
          )
        )}
      </group>
    </group>
  );
}