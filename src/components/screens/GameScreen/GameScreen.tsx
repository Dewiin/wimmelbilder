import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

//api
import { getMapAndCharacters } from '@/api/map'

// components
import { GameDropdown } from './GameDropdown'
import { GameHUD } from './GameHUD'

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
        
        function handleResize() {
            const gameImage = document.getElementById("gameImage");
            const gameDropdown = document.getElementById("gameDropdown");
            if(!gameImage || !gameDropdown) return;

            const imageRect = gameImage.getBoundingClientRect();
            const dropdownRect = gameDropdown.getBoundingClientRect();
            setMenuPosition((prev) => ({
                x: Math.min(prev.x, imageRect.width - dropdownRect.width),
                y: Math.min(prev.y, imageRect.height - dropdownRect.height),
            }));
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [menuOpen]);

    function handleClick(e: React.MouseEvent<HTMLImageElement>) {      
        const gameDropdown = document.getElementById("gameDropdown");
        if(!gameDropdown) return;

        const imageRect = e.currentTarget.getBoundingClientRect();
        const gameDropdownRect = gameDropdown.getBoundingClientRect();

        const normalizedX = (e.clientX - imageRect.left) /imageRect.width;
        const normalizedY = (e.clientY - imageRect.top) /imageRect.height;
        setClickPosition({
            x: normalizedX,
            y: normalizedY
        });

        console.log("X:", normalizedX, "Y:", normalizedY);

        const relativeX = e.clientX - imageRect.left;
        const relativeY = e.clientY - imageRect.top;
        setMenuPosition({
            x: Math.min(relativeX, imageRect.width - gameDropdownRect.width),
            y: Math.min(relativeY, imageRect.height - gameDropdownRect.height)
        });

        setMenuOpen(true);
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
                    onClick={(e) => handleClick(e)}
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