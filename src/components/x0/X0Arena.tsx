'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, OrbitControls } from '@react-three/drei';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Gauge,
  RotateCcw,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

type Mark = 'X' | 'O';
type Cell = Mark | null;
type Mode = 'bot' | 'local';
type BotLevel = 'easy' | 'medium' | 'hard';
type PieceStyle = 'character' | 'shape';
type AvatarId = 'voxel' | 'builder' | 'runner' | 'hero' | 'shadow' | 'captain';
type ShapeId = 'x' | 'o' | 'square' | 'triangle' | 'diamond' | 'hex';

type Avatar = {
  id: AvatarId;
  name: string;
  vibe: string;
  body: string;
  accent: string;
  trim: string;
  skin: string;
  hair: string;
  helmet: string;
  silhouette: 'hero' | 'runner' | 'builder' | 'bot';
};

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          title?: string;
          description: string;
          inputSchema: object;
          annotations?: {
            readOnlyHint?: boolean;
            untrustedContentHint?: boolean;
          };
          execute: (input: unknown) => unknown;
        },
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const cellPositions = [
  [-2, 2],
  [0, 2],
  [2, 2],
  [-2, 0],
  [0, 0],
  [2, 0],
  [-2, -2],
  [0, -2],
  [2, -2],
] as const;

const avatars: Avatar[] = [
  {
    id: 'voxel',
    name: 'Neon Crafter',
    vibe: 'glowing explorer',
    body: '#22c7b8',
    accent: '#76f7ff',
    trim: '#3454d1',
    skin: '#f0b58f',
    hair: '#4a2b19',
    helmet: '#133142',
    silhouette: 'hero',
  },
  {
    id: 'builder',
    name: 'Gold Builder',
    vibe: 'heavy builder',
    body: '#f59e0b',
    accent: '#fde047',
    trim: '#475569',
    skin: '#d89b72',
    hair: '#1f2937',
    helmet: '#facc15',
    silhouette: 'builder',
  },
  {
    id: 'runner',
    name: 'Pink Runner',
    vibe: 'fast arcade',
    body: '#ef476f',
    accent: '#ffffff',
    trim: '#06b6d4',
    skin: '#f6c6a8',
    hair: '#111827',
    helmet: '#ff7aa8',
    silhouette: 'runner',
  },
  {
    id: 'hero',
    name: 'Cyber Hero',
    vibe: 'bright battler',
    body: '#8b5cf6',
    accent: '#f8fafc',
    trim: '#22c55e',
    skin: '#c98f68',
    hair: '#7c2d12',
    helmet: '#5b21b6',
    silhouette: 'bot',
  },
  {
    id: 'shadow',
    name: 'Shadow Ninja',
    vibe: 'stealth striker',
    body: '#111827',
    accent: '#a7f3d0',
    trim: '#334155',
    skin: '#b7795f',
    hair: '#020617',
    helmet: '#0f172a',
    silhouette: 'runner',
  },
  {
    id: 'captain',
    name: 'Star Captain',
    vibe: 'space leader',
    body: '#2563eb',
    accent: '#f8fafc',
    trim: '#dc2626',
    skin: '#e8b891',
    hair: '#facc15',
    helmet: '#1e3a8a',
    silhouette: 'hero',
  },
];

const avatarById = Object.fromEntries(
  avatars.map((avatar) => [avatar.id, avatar]),
) as Record<AvatarId, Avatar>;

const shapes: { id: ShapeId; label: string }[] = [
  { id: 'x', label: 'X' },
  { id: 'o', label: '0' },
  { id: 'square', label: 'Square' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'hex', label: 'Hex' },
];

function getWinner(board: Cell[]) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { mark: board[a] as Mark, line };
    }
  }

  return null;
}

function getOpenCells(board: Cell[]) {
  return board
    .map((cell, index) => (cell ? null : index))
    .filter((index): index is number => index !== null);
}

function randomChoice<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function findLineMove(board: Cell[], mark: Mark) {
  const open = getOpenCells(board);

  return (
    open.find((index) => {
      const next = [...board];
      next[index] = mark;
      return getWinner(next)?.mark === mark;
    }) ?? null
  );
}

function scoreBoard(board: Cell[], depth: number): number {
  const winner = getWinner(board);
  if (winner?.mark === 'O') {
    return 10 - depth;
  }
  if (winner?.mark === 'X') {
    return depth - 10;
  }
  if (board.every(Boolean)) {
    return 0;
  }

  return Number.NaN;
}

function minimax(board: Cell[], turn: Mark, depth = 0): number {
  const finishedScore = scoreBoard(board, depth);
  if (!Number.isNaN(finishedScore)) {
    return finishedScore;
  }

  const scores = getOpenCells(board).map((index) => {
    const next = [...board];
    next[index] = turn;
    return minimax(next, turn === 'O' ? 'X' : 'O', depth + 1);
  });

  return turn === 'O' ? Math.max(...scores) : Math.min(...scores);
}

function pickStrategicMove(board: Cell[]) {
  const open = getOpenCells(board);
  const center = board[4] ? null : 4;
  const availableCorners = [0, 2, 6, 8].filter((index) => !board[index]);
  const availableSides = [1, 3, 5, 7].filter((index) => !board[index]);

  return (
    findLineMove(board, 'O') ??
    findLineMove(board, 'X') ??
    center ??
    randomChoice(availableCorners) ??
    randomChoice(availableSides) ??
    randomChoice(open) ??
    null
  );
}

function pickHardMove(board: Cell[]) {
  const open = getOpenCells(board);
  const scoredMoves = open.map((index) => {
    const next = [...board];
    next[index] = 'O';
    return { index, score: minimax(next, 'X', 1) };
  });
  const bestScore = Math.max(...scoredMoves.map((move) => move.score));
  const bestMoves = scoredMoves
    .filter((move) => move.score === bestScore)
    .map((move) => move.index);

  return randomChoice(bestMoves) ?? null;
}

function pickBotMove(board: Cell[], level: BotLevel) {
  const open = getOpenCells(board);
  if (!open.length) {
    return null;
  }

  if (level === 'easy') {
    const winningMove = findLineMove(board, 'O');
    return Math.random() < 0.18 && winningMove !== null
      ? winningMove
      : (randomChoice(open) ?? null);
  }

  if (level === 'medium') {
    const winningMove = findLineMove(board, 'O');
    const blockingMove = findLineMove(board, 'X');

    if (winningMove !== null && Math.random() < 0.85) {
      return winningMove;
    }
    if (blockingMove !== null && Math.random() < 0.68) {
      return blockingMove;
    }

    return Math.random() < 0.55
      ? pickStrategicMove(board)
      : (randomChoice(open) ?? null);
  }

  return pickHardMove(board);
}

function describeState(board: Cell[], current: Mark, botLevel: BotLevel) {
  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  return {
    board,
    currentTurn: current,
    botLevel,
    winner: winner?.mark ?? null,
    winningLine: winner?.line ?? null,
    draw,
    openCells: getOpenCells(board),
  };
}

function AvatarFigure({
  avatar,
  mark,
  active,
}: {
  avatar: Avatar;
  mark: Mark;
  active: boolean;
}) {
  const teamColor = mark === 'X' ? '#65e4ff' : '#ffcf5c';
  const teamGlow = mark === 'X' ? '#0ea5e9' : '#f97316';
  const isRunner = avatar.silhouette === 'runner';
  const isBuilder = avatar.silhouette === 'builder';
  const isBot = avatar.silhouette === 'bot';

  return (
    <Float
      floatIntensity={active ? 0.16 : 0.05}
      rotationIntensity={0.05}
      speed={1.9}
    >
      <group position={[0, -0.08, 0.24]} scale={0.72}>
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.58, 0.68, 0.12, 40]} />
          <meshStandardMaterial
            color={teamColor}
            emissive={teamGlow}
            emissiveIntensity={active ? 0.72 : 0.38}
            metalness={0.5}
            roughness={0.22}
          />
        </mesh>

        <mesh position={[0, 0, 0.58]} castShadow>
          <boxGeometry
            args={isBuilder ? [0.78, 0.48, 0.82] : [0.66, 0.44, 0.8]}
          />
          <meshStandardMaterial
            color={avatar.body}
            emissive={avatar.body}
            emissiveIntensity={0.08}
            metalness={0.18}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, -0.24, 0.72]}>
          <boxGeometry args={[0.38, 0.06, 0.18]} />
          <meshStandardMaterial
            color={avatar.accent}
            emissive={avatar.accent}
            emissiveIntensity={0.24}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.25, 0.6]}>
          <boxGeometry args={[0.52, 0.08, 0.5]} />
          <meshStandardMaterial color={avatar.trim} roughness={0.36} />
        </mesh>

        <mesh position={[-0.26, 0, 0.06]} castShadow>
          <boxGeometry args={[0.22, 0.32, 0.3]} />
          <meshStandardMaterial color={avatar.trim} roughness={0.44} />
        </mesh>
        <mesh position={[0.26, 0, 0.06]} castShadow>
          <boxGeometry args={[0.22, 0.32, 0.3]} />
          <meshStandardMaterial color={avatar.trim} roughness={0.44} />
        </mesh>

        <mesh
          position={[-0.5, -0.01, 0.6]}
          rotation={[0, 0, isRunner ? -0.36 : -0.12]}
          castShadow
        >
          <boxGeometry args={[0.18, 0.28, isRunner ? 0.68 : 0.58]} />
          <meshStandardMaterial color={avatar.body} roughness={0.34} />
        </mesh>
        <mesh
          position={[0.5, -0.01, 0.6]}
          rotation={[0, 0, isRunner ? 0.36 : 0.12]}
          castShadow
        >
          <boxGeometry args={[0.18, 0.28, isRunner ? 0.68 : 0.58]} />
          <meshStandardMaterial color={avatar.body} roughness={0.34} />
        </mesh>
        <mesh position={[-0.5, -0.02, 0.2]} castShadow>
          <sphereGeometry args={[0.14, 18, 12]} />
          <meshStandardMaterial color={avatar.skin} roughness={0.4} />
        </mesh>
        <mesh position={[0.5, -0.02, 0.2]} castShadow>
          <sphereGeometry args={[0.14, 18, 12]} />
          <meshStandardMaterial color={avatar.skin} roughness={0.4} />
        </mesh>

        <mesh position={[0, -0.02, 1.25]} castShadow>
          <boxGeometry args={isBot ? [0.82, 0.62, 0.62] : [0.76, 0.58, 0.62]} />
          <meshStandardMaterial color={avatar.skin} roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.01, 1.55]} castShadow>
          <boxGeometry
            args={isBuilder ? [0.86, 0.66, 0.24] : [0.8, 0.62, 0.22]}
          />
          <meshStandardMaterial
            color={avatar.helmet}
            emissive={avatar.helmet}
            emissiveIntensity={0.08}
            roughness={0.26}
          />
        </mesh>
        <mesh position={[0, -0.34, 1.28]}>
          <boxGeometry args={[0.48, 0.05, 0.16]} />
          <meshStandardMaterial
            color={isBot ? avatar.accent : '#08111f'}
            emissive={isBot ? avatar.accent : '#000000'}
            emissiveIntensity={isBot ? 0.38 : 0}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0, -0.37, 1.08]}>
          <boxGeometry args={[0.24, 0.04, 0.05]} />
          <meshStandardMaterial color={avatar.accent} roughness={0.2} />
        </mesh>

        {isBuilder ? (
          <mesh position={[0.42, -0.31, 1.55]} rotation={[0.3, 0, -0.45]}>
            <boxGeometry args={[0.3, 0.06, 0.16]} />
            <meshStandardMaterial color={avatar.accent} roughness={0.22} />
          </mesh>
        ) : null}

        {isRunner ? (
          <mesh position={[0, 0.31, 1.52]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.52, 0.08, 0.1]} />
            <meshStandardMaterial color={avatar.accent} roughness={0.2} />
          </mesh>
        ) : null}
      </group>
    </Float>
  );
}

function ShapeSymbol({
  shape,
  mark,
  active,
}: {
  shape: ShapeId;
  mark: Mark;
  active: boolean;
}) {
  const color = mark === 'X' ? '#65e4ff' : '#ffcf5c';
  const emissive = mark === 'X' ? '#0ea5e9' : '#f97316';
  const intensity = active ? 0.9 : 0.5;
  const symbolZ = 0.58;

  if (shape === 'o') {
    return (
      <mesh position={[0, 0, symbolZ]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.58, 0.12, 24, 72]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.55}
          roughness={0.24}
        />
      </mesh>
    );
  }

  if (shape === 'square') {
    return (
      <mesh position={[0, 0, symbolZ]}>
        <boxGeometry args={[1.08, 1.08, 0.2]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.42}
          roughness={0.3}
        />
      </mesh>
    );
  }

  if (shape === 'triangle') {
    return (
      <mesh position={[0, 0, symbolZ]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 3]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.42}
          roughness={0.3}
        />
      </mesh>
    );
  }

  if (shape === 'diamond') {
    return (
      <mesh position={[0, 0, symbolZ]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.95, 0.95, 0.22]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.48}
          roughness={0.24}
        />
      </mesh>
    );
  }

  if (shape === 'hex') {
    return (
      <mesh position={[0, 0, symbolZ]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.22, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.48}
          roughness={0.24}
        />
      </mesh>
    );
  }

  return (
    <group position={[0, 0, symbolZ]}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.38, 0.22, 0.22]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1.38, 0.22, 0.22]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function GamePiece({
  mark,
  active,
  avatar,
  shape,
  pieceStyle,
}: {
  mark: Mark;
  active: boolean;
  avatar: Avatar;
  shape: ShapeId;
  pieceStyle: PieceStyle;
}) {
  if (pieceStyle === 'character') {
    return <AvatarFigure avatar={avatar} mark={mark} active={active} />;
  }

  return (
    <Float
      floatIntensity={active ? 0.22 : 0.08}
      rotationIntensity={0.08}
      speed={2.25}
    >
      <ShapeSymbol shape={shape} mark={mark} active={active} />
    </Float>
  );
}

function WinBeam({ line }: { line: readonly [number, number, number] }) {
  const [startX, startY] = cellPositions[line[0]];
  const [endX, endY] = cellPositions[line[2]];
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const angle = Math.atan2(endY - startY, endX - startX);
  const length = Math.hypot(endX - startX, endY - startY) + 1.35;

  return (
    <mesh position={[midX, midY, 0.72]} rotation={[0, 0, angle]}>
      <boxGeometry args={[length, 0.16, 0.16]} />
      <meshStandardMaterial
        color="#f5f7ff"
        emissive="#b6ff6d"
        emissiveIntensity={1.3}
        toneMapped={false}
      />
    </mesh>
  );
}

function BoardScene({
  board,
  current,
  winnerLine,
  boardYaw,
  pieceStyle,
  selectedAvatars,
  selectedShapes,
  onMove,
}: {
  board: Cell[];
  current: Mark;
  winnerLine: readonly [number, number, number] | null;
  boardYaw: number;
  pieceStyle: PieceStyle;
  selectedAvatars: Record<Mark, AvatarId>;
  selectedShapes: Record<Mark, ShapeId>;
  onMove: (index: number) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, -0.45, 10.5], fov: 48 }}
      dpr={[1, 1.8]}
      shadows
    >
      <color attach="background" args={['#101521']} />
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, -5, 8]} intensity={2.6} castShadow />
      <directionalLight position={[-4, 3, 5]} intensity={1.1} />
      <pointLight position={[-4, -3, 3]} color="#65e4ff" intensity={36} />
      <pointLight position={[4, 3, 3]} color="#ffcf5c" intensity={28} />
      <hemisphereLight args={['#e4fbff', '#111827', 1.35]} />

      <group rotation={[-0.38, 0, boardYaw]} scale={0.9}>
        <mesh position={[0, 0, -0.18]} receiveShadow>
          <boxGeometry args={[6.78, 6.78, 0.28]} />
          <meshStandardMaterial
            color="#070d18"
            metalness={0.5}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0, 0, -0.01]} receiveShadow>
          <boxGeometry args={[6.34, 6.34, 0.08]} />
          <meshStandardMaterial
            color="#142033"
            metalness={0.3}
            roughness={0.36}
          />
        </mesh>

        {[-1, 1].map((offset) => (
          <group key={offset}>
            <mesh position={[offset, 0, 0.2]} castShadow>
              <boxGeometry args={[0.16, 5.85, 0.22]} />
              <meshStandardMaterial
                color="#e8fbff"
                emissive="#38bdf8"
                emissiveIntensity={0.75}
                metalness={0.25}
                roughness={0.18}
              />
            </mesh>
            <mesh position={[0, offset, 0.2]} castShadow>
              <boxGeometry args={[5.85, 0.16, 0.22]} />
              <meshStandardMaterial
                color="#e8fbff"
                emissive="#38bdf8"
                emissiveIntensity={0.75}
                metalness={0.25}
                roughness={0.18}
              />
            </mesh>
          </group>
        ))}

        {cellPositions.map(([x, y], index) => (
          <group key={index} position={[x, y, 0]}>
            <mesh
              onClick={() => onMove(index)}
              onPointerOver={(event) => {
                event.stopPropagation();
                document.body.style.cursor =
                  board[index] || winnerLine ? 'default' : 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
            >
              <boxGeometry args={[1.72, 1.72, 0.14]} />
              <meshStandardMaterial
                color={
                  board[index]
                    ? index % 2 === 0
                      ? '#253246'
                      : '#202b3d'
                    : index % 2 === 0
                      ? '#1e2b3f'
                      : '#182437'
                }
                emissive={
                  !board[index]
                    ? current === 'X'
                      ? '#0b526b'
                      : '#5f3b08'
                    : '#030712'
                }
                emissiveIntensity={board[index] ? 0.06 : 0.18}
                metalness={0.22}
                roughness={0.34}
              />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[1.46, 1.46, 0.03]} />
              <meshStandardMaterial
                transparent
                opacity={0.34}
                color={
                  board[index]
                    ? board[index] === 'X'
                      ? '#65e4ff'
                      : '#ffcf5c'
                    : current === 'X'
                      ? '#65e4ff'
                      : '#ffcf5c'
                }
                emissive={
                  board[index] === 'O' || (!board[index] && current === 'O')
                    ? '#f59e0b'
                    : '#0ea5e9'
                }
                emissiveIntensity={0.18}
              />
            </mesh>
            {board[index] ? (
              <GamePiece
                mark={board[index]}
                avatar={avatarById[selectedAvatars[board[index]]]}
                shape={selectedShapes[board[index]]}
                pieceStyle={pieceStyle}
                active={winnerLine?.includes(index) ?? false}
              />
            ) : null}
          </group>
        ))}

        {winnerLine ? <WinBeam line={winnerLine} /> : null}
      </group>

      <ContactShadows
        position={[0, -3.55, -1.8]}
        opacity={0.36}
        scale={8}
        blur={2.4}
        far={4}
      />
      <OrbitControls
        enablePan={false}
        enableRotate
        rotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.85}
        minPolarAngle={Math.PI / 8}
        maxDistance={12}
        minDistance={5.8}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

export default function Home() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<Mark>('X');
  const [mode, setMode] = useState<Mode>('bot');
  const [botLevel, setBotLevel] = useState<BotLevel>('medium');
  const [pieceStyle, setPieceStyle] = useState<PieceStyle>('character');
  const [boardYaw, setBoardYaw] = useState(0);
  const [selectedAvatars, setSelectedAvatars] = useState<
    Record<Mark, AvatarId>
  >({
    X: 'voxel',
    O: 'runner',
  });
  const [selectedShapes, setSelectedShapes] = useState<Record<Mark, ShapeId>>({
    X: 'x',
    O: 'o',
  });
  const [score, setScore] = useState({ x: 0, o: 0, draws: 0 });

  const winner = useMemo(() => getWinner(board), [board]);
  const isDraw = !winner && board.every(Boolean);
  const isBotThinking = mode === 'bot' && current === 'O' && !winner && !isDraw;

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setCurrent('X');
  };

  const resetMatch = () => {
    resetRound();
    setScore({ x: 0, o: 0, draws: 0 });
  };

  const makeMove = (index: number) => {
    if (board[index] || winner || isDraw || isBotThinking) {
      return;
    }

    setBoard((previous) => {
      const next = [...previous];
      next[index] = current;
      return next;
    });
    setCurrent((turn) => (turn === 'X' ? 'O' : 'X'));
  };

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) {
      return;
    }

    const lifecycle = new AbortController();

    const reportError = (error: unknown) => {
      console.error('WebMCP tool registration failed', error);
    };

    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'read_x0_game_state',
            title: 'Read X0 game state',
            description:
              'Read the current X0 Arena board, turn, winner, and open cells.',
            inputSchema: {
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true, untrustedContentHint: false },
            execute() {
              return describeState(board, current, botLevel);
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(reportError);

      void Promise.resolve(
        context.registerTool(
          {
            name: 'play_x0_cell',
            title: 'Play X0 cell',
            description:
              'Play the current mark in a numbered X0 Arena cell from 0 to 8.',
            inputSchema: {
              type: 'object',
              properties: {
                cell: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 8,
                },
              },
              required: ['cell'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input) {
              if (!input || typeof input !== 'object' || !('cell' in input)) {
                throw new Error('Expected a cell number from 0 to 8.');
              }

              const cellInput = (input as { cell: unknown }).cell;
              if (
                typeof cellInput !== 'number' ||
                !Number.isInteger(cellInput) ||
                cellInput < 0 ||
                cellInput > 8
              ) {
                throw new Error('Cell must be an integer from 0 to 8.');
              }

              const cell = cellInput;

              if (board[cell] || winner || isDraw || isBotThinking) {
                throw new Error('That cell cannot be played right now.');
              }

              const next = [...board];
              next[cell] = current;
              setBoard(next);
              setCurrent(current === 'X' ? 'O' : 'X');

              return describeState(next, current === 'X' ? 'O' : 'X', botLevel);
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(reportError);
    } catch (error) {
      reportError(error);
    }

    return () => lifecycle.abort();
  }, [board, botLevel, current, isBotThinking, isDraw, winner]);

  useEffect(() => {
    if (winner) {
      setScore((previous) => ({
        ...previous,
        [winner.mark.toLowerCase()]:
          previous[winner.mark.toLowerCase() as 'x' | 'o'] + 1,
      }));
    } else if (isDraw) {
      setScore((previous) => ({ ...previous, draws: previous.draws + 1 }));
    }
  }, [winner, isDraw]);

  useEffect(() => {
    if (!isBotThinking) {
      return;
    }

    const timer = window.setTimeout(() => {
      const move = pickBotMove(board, botLevel);
      if (move !== null) {
        setBoard((previous) => {
          const next = [...previous];
          next[move] = 'O';
          return next;
        });
        setCurrent('X');
      }
    }, 520);

    return () => window.clearTimeout(timer);
  }, [board, botLevel, isBotThinking]);

  const chooseAvatar = (mark: Mark, avatarId: AvatarId) => {
    setSelectedAvatars((previous) => ({
      ...previous,
      [mark]: avatarId,
    }));
    resetRound();
  };

  const chooseShape = (mark: Mark, shapeId: ShapeId) => {
    setSelectedShapes((previous) => ({
      ...previous,
      [mark]: shapeId,
    }));
    resetRound();
  };

  const status = winner
    ? `${winner.mark} wins this round`
    : isDraw
      ? 'The board is locked'
      : isBotThinking
        ? '0 is lining up a move'
        : `${current}'s turn`;

  const levels: BotLevel[] = ['easy', 'medium', 'hard'];
  const rotateBoard = (direction: -1 | 1) => {
    setBoardYaw((previous) => previous + direction * (Math.PI / 2));
  };

  return (
    <main className="h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_16%,#23415d_0,#101521_32%,#070910_76%)] text-white max-lg:h-auto max-lg:min-h-screen max-lg:overflow-y-auto">
      <section className="mx-auto grid h-screen w-full max-w-[1500px] grid-cols-[minmax(0,1fr)_340px] gap-5 px-4 py-4 lg:px-6 max-lg:h-auto max-lg:grid-cols-1">
        <div className="relative h-[calc(100vh-32px)] min-h-0 overflow-hidden rounded-lg border border-white/10 bg-[#0b101b]/80 shadow-2xl shadow-sky-950/40 max-lg:h-[62vh] max-lg:min-h-[420px]">
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/28 px-3 py-2 text-sm text-slate-200 backdrop-blur-md">
            <Sparkles className="size-4 text-cyan-200" />
            X0 Arena
          </div>
          <BoardScene
            board={board}
            current={current}
            winnerLine={winner?.line ?? null}
            boardYaw={boardYaw}
            pieceStyle={pieceStyle}
            selectedAvatars={selectedAvatars}
            selectedShapes={selectedShapes}
            onMove={makeMove}
          />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 p-2 backdrop-blur-md">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/12"
              onClick={() => rotateBoard(-1)}
              aria-label="Rotate board left"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/12"
              onClick={() => rotateBoard(1)}
              aria-label="Rotate board right"
            >
              <ArrowRight className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-8 border-white/15 bg-white/5 px-2 text-white hover:bg-white/12"
              onClick={() => setBoardYaw(0)}
            >
              View
            </Button>
          </div>
        </div>

        <aside className="flex h-[calc(100vh-32px)] min-h-0 flex-col justify-between gap-4 overflow-y-auto rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl max-lg:h-auto max-lg:min-h-0">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-cyan-200">
                Tic-Tac-Toe
              </p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
                Play X vs 0 in 3D
              </h1>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/24 p-3">
              <p className="text-sm text-slate-300">Status</p>
              <p className="mt-1 text-xl font-semibold text-white">{status}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-2.5">
                <p className="text-sm text-cyan-100">X</p>
                <p className="text-2xl font-semibold">{score.x}</p>
              </div>
              <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-2.5">
                <p className="text-sm text-amber-100">0</p>
                <p className="text-2xl font-semibold">{score.o}</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-2.5">
                <p className="text-sm text-slate-200">Draw</p>
                <p className="text-2xl font-semibold">{score.draws}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={mode === 'bot' ? 'default' : 'outline'}
                className={
                  mode === 'bot'
                    ? 'h-11 bg-cyan-300 text-slate-950 hover:bg-cyan-200'
                    : 'h-11 border-white/15 bg-white/5 text-white hover:bg-white/12'
                }
                onClick={() => {
                  setMode('bot');
                  resetRound();
                }}
              >
                <Cpu className="size-4" />
                vs Bot
              </Button>
              <Button
                type="button"
                variant={mode === 'local' ? 'default' : 'outline'}
                className={
                  mode === 'local'
                    ? 'h-11 bg-amber-300 text-slate-950 hover:bg-amber-200'
                    : 'h-11 border-white/15 bg-white/5 text-white hover:bg-white/12'
                }
                onClick={() => {
                  setMode('local');
                  resetRound();
                }}
              >
                <Users className="size-4" />2 Player
              </Button>
            </div>

            {mode === 'bot' ? (
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                  <Gauge className="size-4 text-emerald-200" />
                  Bot level
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={botLevel === level ? 'default' : 'outline'}
                      className={
                        botLevel === level
                          ? 'h-10 bg-emerald-300 px-2 text-slate-950 hover:bg-emerald-200'
                          : 'h-10 border-white/15 bg-white/5 px-2 text-white hover:bg-white/12'
                      }
                      onClick={() => {
                        setBotLevel(level);
                        resetRound();
                      }}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                <UserRound className="size-4 text-cyan-200" />
                Piece style
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['character', 'shape'] as const).map((style) => (
                  <Button
                    key={style}
                    type="button"
                    variant={pieceStyle === style ? 'default' : 'outline'}
                    className={
                      pieceStyle === style
                        ? 'h-10 bg-cyan-300 px-2 capitalize text-slate-950 hover:bg-cyan-200'
                        : 'h-10 border-white/15 bg-white/5 px-2 capitalize text-white hover:bg-white/12'
                    }
                    onClick={() => {
                      setPieceStyle(style);
                      resetRound();
                    }}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            {pieceStyle === 'character' ? (
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                  <UserRound className="size-4 text-cyan-200" />
                  Characters
                </div>
                <div className="space-y-4">
                  {(['X', 'O'] as const).map((mark) => (
                    <div key={mark}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-white">
                          {mark} player
                        </p>
                        <p className="truncate text-sm text-slate-300">
                          {avatarById[selectedAvatars[mark]].name}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {avatars.map((avatar) => {
                          const selected = selectedAvatars[mark] === avatar.id;

                          return (
                            <button
                              key={`${mark}-${avatar.id}`}
                              type="button"
                              className={`flex h-12 items-center gap-2 rounded-lg border p-2 text-left transition ${
                                selected
                                  ? mark === 'X'
                                    ? 'border-cyan-200 bg-cyan-300/18'
                                    : 'border-amber-200 bg-amber-300/18'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                              onClick={() => chooseAvatar(mark, avatar.id)}
                            >
                              <span
                                className="grid size-8 shrink-0 place-items-center rounded-md border border-white/10"
                                style={{ backgroundColor: avatar.body }}
                                aria-hidden="true"
                              >
                                <span
                                  className="block size-3 rounded-sm"
                                  style={{ backgroundColor: avatar.accent }}
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-white">
                                  {avatar.name}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {pieceStyle === 'shape' ? (
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                  <Sparkles className="size-4 text-amber-200" />
                  Shapes
                </div>
                <div className="space-y-4">
                  {(['X', 'O'] as const).map((mark) => (
                    <div key={`${mark}-shape`}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-white">
                          {mark} shape
                        </p>
                        <p className="truncate text-sm capitalize text-slate-300">
                          {selectedShapes[mark]}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {shapes.map((shape) => {
                          const selected = selectedShapes[mark] === shape.id;

                          return (
                            <button
                              key={`${mark}-${shape.id}`}
                              type="button"
                              className={`grid h-10 place-items-center rounded-lg border px-1 text-sm font-semibold transition ${
                                selected
                                  ? mark === 'X'
                                    ? 'border-cyan-200 bg-cyan-300/18 text-cyan-50'
                                    : 'border-amber-200 bg-amber-300/18 text-amber-50'
                                  : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                              }`}
                              onClick={() => chooseShape(mark, shape.id)}
                              aria-label={`Use ${shape.label} for ${mark}`}
                            >
                              {shape.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
              className="h-11 bg-white text-slate-950 hover:bg-slate-200"
              onClick={resetRound}
            >
              <RotateCcw className="size-4" />
              Round
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 border-white/15 bg-transparent text-white hover:bg-white/12"
              onClick={resetMatch}
            >
              Match
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
}
