// assets
import spacecon from '@/assets/maps/spacecon.jpg'
import undrcty from '@/assets/maps/undrcty.jpg'
import universe11 from '@/assets/maps/universe11.jpg'

// components
import { 
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator
} from '@/components/ui/context-menu'

// types
import type { TMap } from '@/types/TMap'

function getMapImage(map: TMap) {
    if(map === "spacecon") return spacecon;
    if(map === "undrcty") return undrcty;
    if(map === "universe11") return universe11;
}

export function GameScreen({ map } : { map: TMap }) {
    const mapImage = getMapImage(map);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <img 
                    src={mapImage}
                    className='w-full'    
                />
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    variant='destructive'
                >
                    Quit Game
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}