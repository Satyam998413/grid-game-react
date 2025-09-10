// src/App.jsx
import { useState, useCallback, useRef, useEffect } from "react";
import { getNextPatternGrid } from "../utilities/pattern";

const Main = () => {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState(() => getNextPatternGrid(20, 20, 0, "plus"));
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  console.log(step);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setStep((s) => {
      const newStep = s + 1;
      setGrid(getNextPatternGrid(rows, cols, newStep));
      return newStep;
    });

    setTimeout(runSimulation, 300);
  }, [rows, cols]);

  const handleResize = useCallback(() => {
    setStep(0);
    setGrid(getNextPatternGrid(rows, cols, 0));
  }, [rows, cols]);

  useEffect(() => {
    handleResize();
    return () => {};
  }, [handleResize]);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">
        Red Priority Moving Pattern + Green Cross
      </h1>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleResize}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Reset
        </button>
      </div>

      {/* Grid Size Controls */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={rows}
          min="5"
          onChange={(e) => {
            if (+e.target.value < 5) {
              setRows(5);
            } else {
              setRows(Number(e.target.value));
            }
          }}
          className="border p-1 rounded w-20"
        />
        <input
          type="number"
          value={cols}
          min="5"
          onChange={(e) => {
            if (+e.target.value < 5) {
              setCols(5);
            } else {
              setCols(Number(e.target.value));
            }
          }}
          className="border p-1 rounded w-20"
        />
        <button
          onClick={handleResize}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Resize
        </button>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 20px)`,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="w-5 h-5 border border-gray-300"
              style={{
                backgroundColor:
                  cell === 1 ? "red" : cell === 2 ? "green" : "white",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Main;
