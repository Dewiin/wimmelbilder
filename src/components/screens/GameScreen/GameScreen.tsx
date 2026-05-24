import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

//api
import { getMapByName } from '@/api/map'

// components
import { GameDropdown } from './GameDropdown'

// motion
import { AnimatePresence, motion } from 'motion/react'

// types
import type { TMap } from '@/types/TMap'
import type { TCoords } from '@/types/TCoords'

const SCROLL_WIDTH = document.documentElement.scrollWidth;
const SCROLL_HEIGHT = document.documentElement.scrollHeight;
const DROPDOWN_WIDTH = 256;
const DROPDOWN_HEIGHT = 185;
export function GameScreen() {
    const { mapName } = useParams();
    const [ map, setMap ] = useState<TMap|undefined>();
    const [ clickPosition, setClickPosition ] = useState<TCoords>({x: 0, y: 0});
    const [ menuPosition, setMenuPosition ] = useState<TCoords>({x: 0, y: 0});
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

    useEffect(() => {
        if(mapName) getMapByName(mapName, setMap);
    }, [mapName]);

    // useEffect(() => {
    //     if (!menuOpen) return;

    //     function handleResize() {
    //         setMenuPosition((prev) => ({
    //             x: Math.min(prev.x, SCROLL_WIDTH - DROPDOWN_WIDTH),
    //             y: Math.min(prev.y, SCROLL_HEIGHT - DROPDOWN_HEIGHT),
    //         }));
    //     }

    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, [menuOpen]);

    function handleClick(e: React.MouseEvent<HTMLImageElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const normalizedX = (e.clientX - rect.left) / rect.width;
        const normalizedY = (e.clientY - rect.top) / rect.height;

        setClickPosition({x: normalizedX, y: normalizedY});
        setMenuPosition({
            x: Math.min(e.pageX, SCROLL_WIDTH - DROPDOWN_WIDTH), 
            y: Math.min(e.pageY, SCROLL_HEIGHT - DROPDOWN_HEIGHT)
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
                    src={map.imageUrl}
                    className="min-w-200"    
                    onClick={(e) => handleClick(e)}
                />
                {menuOpen && 
                    <GameDropdown coords={menuPosition} setMenuOpen={setMenuOpen} />
                }
            </motion.div>
            }
        </AnimatePresence>
    )
}