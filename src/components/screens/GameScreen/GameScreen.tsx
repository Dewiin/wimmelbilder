import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

//api
import { getMapAndCharacters } from '@/api/map'
import { startGameSession, endGameSession } from '@/api/game'

// components
import { GameDropdown } from './GameDropdown'
import { GameHUD } from './GameHUD'
import { GameComplete } from './GameComplete'

// contexts
import { useUI } from '@/contexts/UIContext'

// helpers
import { handleClick, handleResize } from '@/components/helpers/gameScreen'

// motion
import { AnimatePresence, motion } from 'motion/react'

// types
import type { TMap } from '@/types/TMap'
import type { TCoords } from '@/types/TCoords'
import type { TCharacter } from '@/types/TCharacter'
import type { TSession } from '@/types/TSession'
import { toast } from 'sonner'

export function GameScreen() {
    const [ gameSession, setGameSession ] = useState<TSession|undefined>();
    const [ map, setMap ] = useState<TMap|undefined>();
    const [ characters, setCharacters ] = useState<TCharacter[]>([]);
    const [ clickPosition, setClickPosition ] = useState<TCoords>({x: 0, y: 0});
    const [ menuPosition, setMenuPosition ] = useState<TCoords>({x: 0, y: 0});
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const [ gameCompleted, setGameCompleted ] = useState<boolean>(false);
    
    const { mapName } = useParams();
    const { setSonner } = useUI();

    useEffect(() => {
        if(!mapName || gameSession) return;

        toast.promise(async () => {
            await Promise.all([
                startGameSession(setGameSession, setSonner),
                getMapAndCharacters(mapName, setMap, setCharacters)
            ]);
        }, { 
            loading: "Starting game session...", 
            position: "top-right" 
        });
    }, [mapName, gameSession]);

    useEffect(() => {
        if(!gameCompleted || !gameSession) return;

        toast.promise(endGameSession(gameSession.id, setGameSession, setSonner), {
            loading: "Ending game session...",
            position: "top-right"
        });
    }, [gameCompleted])

    useEffect(() => {
        if (!menuOpen) return;
        function onResize() { handleResize(setMenuPosition) }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [menuOpen]);

    function onClick(e: React.MouseEvent<HTMLImageElement>) {      
        handleClick(e, setClickPosition, setMenuPosition, setMenuOpen);
    }

    return (
        <AnimatePresence>
            {map && gameSession && 
            <motion.div
                className="relative overflow-auto"
                initial={{ opacity: 0, y: 1000 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 40,
                }}
            >
                <img 
                    id='gameImage'
                    src={map.imageUrl}
                    className="min-w-200 w-full"    
                    onClick={(e) => onClick(e)}
                />
                <GameHUD characters={characters} />
                <GameDropdown 
                    coords={menuPosition} 
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen} 
                    characters={characters}    
                    setCharacters={setCharacters}
                    clickPosition={clickPosition}
                    mapName={map.name}
                    sessionId={gameSession.id}
                    setGameCompleted={setGameCompleted}
                />
                { gameCompleted && gameSession.completedAt &&
                    <GameComplete gameSession={gameSession} />
                }
            </motion.div>
            }
        </AnimatePresence>
    )
}