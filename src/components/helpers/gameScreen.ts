import type { Dispatch, SetStateAction, MouseEvent } from "react";
import type { TCoords } from "@/types/TCoords";

export function handleResize(
    setMenuPosition: Dispatch<SetStateAction<TCoords>>
) {
    const gameImage = document.getElementById("gameImage");
    const gameDropdown = document.getElementById("gameDropdown");
    if(!gameImage || !gameDropdown) return;

    const imageRect = gameImage.getBoundingClientRect();
    const dropdownRect = gameDropdown.getBoundingClientRect();
    setMenuPosition((prev: TCoords) => ({
        x: Math.min(prev.x, imageRect.width - dropdownRect.width),
        y: Math.min(prev.y, imageRect.height - dropdownRect.height),
    }));
}

export function handleClick(
    e: MouseEvent<HTMLImageElement>,
    setClickPosition: Dispatch<SetStateAction<TCoords>>,
    setMenuPosition: Dispatch<SetStateAction<TCoords>>,
    setMenuOpen: Dispatch<SetStateAction<boolean>>,
) {
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

    const relativeX = e.clientX - imageRect.left;
    const relativeY = e.clientY - imageRect.top;
    setMenuPosition({
        x: Math.min(relativeX, imageRect.width - gameDropdownRect.width),
        y: Math.min(relativeY, imageRect.height - gameDropdownRect.height)
    });

    setMenuOpen(true);
}