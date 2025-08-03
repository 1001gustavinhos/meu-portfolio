"use client";

import React, { useState, useMemo, useEffect } from "react";
import clsx from "clsx";

const SIZE = 9;
const SUBGRID_SIZE = 3;
const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

function getSubgrid(row: number, col: number) {
  return (
    Math.floor(row / SUBGRID_SIZE) * SUBGRID_SIZE +
    Math.floor(col / SUBGRID_SIZE)
  );
}

export default function SudokuSection() {
  const [fixedGrid, setFixedGrid] = useState<(number | null)[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  );

  const [activeCells, setActiveCells] = useState<[number, number][]>([]);
  const [gameOver, setGameOver] = useState(false);

  // Calcula os números possíveis para cada célula vazia
  const cellPossibilities = useMemo(() => {
    const possibilities: Record<string, number[]> = {};
    const counts: number[] = [];
    let hasEmptyCellWithNoOptions = false;

    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (fixedGrid[row][col] !== null) continue;

        const possibleNumbers = numbers.filter((num) => {
          // Verifica se o número já está na linha ou coluna
          for (let i = 0; i < SIZE; i++) {
            if (fixedGrid[row][i] === num || fixedGrid[i][col] === num) {
              return false;
            }
          }

          // Verifica subgrid
          const sg = getSubgrid(row, col);
          for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
              if (getSubgrid(r, c) === sg && fixedGrid[r][c] === num) {
                return false;
              }
            }
          }

          return true;
        });

        // Verifica se há células sem opções
        if (possibleNumbers.length === 0) {
          hasEmptyCellWithNoOptions = true;
        }

        possibilities[`${row},${col}`] = possibleNumbers;
        counts.push(possibleNumbers.length);
      }
    }

    // Atualiza o estado de gameOver
    setGameOver(hasEmptyCellWithNoOptions);

    // Encontra o menor número de possibilidades
    const minCount = counts.length > 0 ? Math.min(...counts) : 0;

    // Encontra todas as células com o menor número de possibilidades
    const cellsWithMinOptions: [number, number][] = [];
    for (const key in possibilities) {
      if (possibilities[key].length === minCount) {
        const [row, col] = key.split(",").map(Number);
        cellsWithMinOptions.push([row, col]);
      }
    }

    return { possibilities, activeCells: cellsWithMinOptions };
  }, [fixedGrid]);

  // Atualiza as células ativas quando o grid muda
  useMemo(() => {
    setActiveCells(cellPossibilities.activeCells);
  }, [cellPossibilities]);

  function handleNumberClick(row: number, col: number, num: number) {
    if (fixedGrid[row][col] !== null || gameOver) return;

    setFixedGrid((oldGrid) => {
      const newGrid = oldGrid.map((r) => r.slice());
      newGrid[row][col] = num;
      return newGrid;
    });
  }

  function isNumberHidden(row: number, col: number, num: number) {
    if (fixedGrid[row][col] === num) return false;

    for (let i = 0; i < SIZE; i++) {
      if (fixedGrid[row][i] === num) return true;
      if (fixedGrid[i][col] === num) return true;
    }

    const sg = getSubgrid(row, col);
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (getSubgrid(r, c) === sg && fixedGrid[r][c] === num) return true;
      }
    }

    return false;
  }

  function resetGrid() {
    setFixedGrid(Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
    setActiveCells([]);
    setGameOver(false);
  }

  function isCellActive(row: number, col: number) {
    return activeCells.some(([r, c]) => r === row && c === col);
  }

  return (
    <div className="flex flex-col items-center max-w-[95vw] ">
      <h1 className="text-2xl font-bold font-fira-mono mb-4">
        Gerador de Sudoku
      </h1>

      {gameOver && (
        <div className="mb-4 p-3 bg-foreground font-fira-mono text-background rounded-md">
          <p className="font-bold">Ops! Sem opções disponíveis.</p>
          <p>Tente novamente!</p>
        </div>
      )}

      <div
        className="grid font-fira-mono"
        style={{
          gridTemplateColumns: `repeat(${SUBGRID_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${SUBGRID_SIZE}, minmax(0, 1fr))`,
          width: "auto",
        }}
      >
        {Array.from({ length: SIZE }, (_, bigIndex) => {
          const bigRow = Math.floor(bigIndex / SUBGRID_SIZE);
          const bigCol = bigIndex % SUBGRID_SIZE;

          return (
            <div
              key={bigIndex}
              className="grid border-1 border-foreground"
              style={{
                gridTemplateColumns: `repeat(${SUBGRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${SUBGRID_SIZE}, 1fr)`,
                aspectRatio: "1 / 1",
              }}
            >
              {Array.from({ length: SIZE }, (_, cellIndex) => {
                const cellRow = Math.floor(cellIndex / SUBGRID_SIZE);
                const cellCol = cellIndex % SUBGRID_SIZE;

                const row = bigRow * SUBGRID_SIZE + cellRow;
                const col = bigCol * SUBGRID_SIZE + cellCol;

                const fixedValue = fixedGrid[row][col];
                const isActive = isCellActive(row, col);

                return (
                  <div
                    key={cellIndex}
                    className={clsx(
                      "border border-foreground flex items-center justify-center",
                      !fixedValue && !isActive && "bg-foreground/10",
                      gameOver && fixedValue === null && "bg-red-100/50"
                    )}
                    style={{ aspectRatio: "1 / 1" }}
                  >
                    {fixedValue !== null ? (
                      <span className="text-2xl font-bold">{fixedValue}</span>
                    ) : (
                      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                        {numbers.map((num) => {
                          const hidden = isNumberHidden(row, col, num);

                          return (
                            <button
                              key={num}
                              onClick={() => handleNumberClick(row, col, num)}
                              disabled={hidden || !isActive || gameOver}
                              className={clsx(
                                "flex items-center justify-center text-[9px] md:text-[10px] md:p-2 p-1 transition-all duration-300",
                                hidden
                                  ? "opacity-0 pointer-events-none"
                                  : isActive
                                  ? "opacity-100 hover:bg-foreground/20 cursor-pointer"
                                  : "opacity-50 text-foreground/40 cursor-not-allowed",
                                gameOver && "cursor-not-allowed"
                              )}
                              type="button"
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <button
        onClick={resetGrid}
        className="px-4 py-2 mt-5 border-foreground border-2 text-foreground font-fira-mono rounded hover:bg-foreground/20 mb-10"
      >
        Resetar Sudoku
      </button>
    </div>
  );
}
