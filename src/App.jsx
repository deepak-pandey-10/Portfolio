import { useState } from "react";
import SpaceScene from "./scenes/SpaceScene";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoadingScreen
          onFinish={() => setLoading(false)}
        />
      )}

      {!loading && <SpaceScene />}
    </>
  );
}

export default App;