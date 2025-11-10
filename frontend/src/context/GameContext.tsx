import { createContext, useContext, useState, type ReactNode } from "react";
import { initializeGame } from "../functions/gamePlay";
import type { GameState } from "../types/types";

type GameContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  addLog: (msg: string) => void;
};

// Create with undefined and proper typing
const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState>(initializeGame());

  const addLog = (msg: string) => {
    setGameState((prev: GameState) => ({
      ...prev,
      log: [msg, ...prev.log].slice(0, 10),
    }));
  };

  const value: GameContextType = {
    gameState,
    setGameState,
    addLog,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}