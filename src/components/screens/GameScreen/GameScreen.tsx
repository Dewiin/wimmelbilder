import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

//api
import { getMapAndCharacters } from '@/api/map'

// components
import { GameDropdown } from './GameDropdown'
import { GameHUD } from './GameHUD'

// helpers
import { handleClick, handleResize } from '@/components/helpers/gameScreen'

// motion
import { AnimatePresence, motion } from 'motion/react'

// types
import type { TMap } from '@/types/TMap'
import type { TCoords } from '@/types/TCoords'
import type { TCharacter } from '@/types/TCharacter'

export function GameScreen() {
    const { mapName } = useParams();
    const [ map, setMap ] = useState<TMap|undefined>();
    const [ characters, setCharacters ] = useState<TCharacter[]>([]);
    const [ clickPosition, setClickPosition ] = useState<TCoords>({x: 0, y: 0});
    const [ menuPosition, setMenuPosition ] = useState<TCoords>({x: 0, y: 0});
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

    useEffect(() => {
        if(mapName) getMapAndCharacters(mapName, setMap, setCharacters);
    }, [mapName]);

    useEffect(() => {
        if (!menuOpen) return;
        function onResize() { handleResize(setMenuPosition) }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [menuOpen]);

    function onClick(e: React.MouseEvent<HTMLImageElement>) {      
        handleClick(e, setClickPosition, setMenuPosition, setMenuOpen)
    }

    return (
        <AnimatePresence>
            {map && 
            <motion.div
                className="relative overflow-auto"
                initial={{ opacity: 0, y: 1000 }}
                animate={{ opacity: 1, y: 0 }}
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
                    mapName={mapName}
                />
            </motion.div>
            }
        </AnimatePresence>
    )
}