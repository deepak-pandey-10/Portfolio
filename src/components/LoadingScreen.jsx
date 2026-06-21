import { useEffect, useState } from "react";

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onFinish();
          }, 500);

          return 100;
        }

        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">

      <h1 className="text-6xl font-black bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
        Loading...
      </h1>

      <p className="mt-3 text-zinc-400 tracking-[0.3em] uppercase">
        Entering The Cosmic world
      </p>

      <div className="w-80 h-2 mt-10 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-amber-400">
        {progress}%
      </p>

    </div>
  );
}