import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

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

export function GameScreen() {
    

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <img 
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