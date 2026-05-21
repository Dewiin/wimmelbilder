import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

//api
import { getMapByName } from '@/api/map'

// components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// motion
import { AnimatePresence, motion } from 'motion/react'

// types
import type { TMap } from '@/types/TMap'

export function GameScreen() {
    const { mapName } = useParams();
    const [ map, setMap ] = useState<TMap|undefined>();

    const navigate = useNavigate();

    useEffect(() => {
        if(mapName) getMapByName(mapName, setMap);
    }, [mapName]);

    return (
        <AnimatePresence>
            {map && 
            <motion.div
                initial={{ opacity: 0, y: 1000 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <img 
                    src={map?.imageUrl}
                    className='h-full'    
                />
            </motion.div>
            }
        </AnimatePresence>
    )
}