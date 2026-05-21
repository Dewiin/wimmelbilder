import { Skeleton } from "@/components/ui/skeleton";

export function GameCardSkeleton() {
    return (
        <Skeleton className="w-full md:h-165 h-110">
            {/* <img
                src={ map.imageUrl }
                alt="Map cover"
                className="relative z-20 aspect-square object-cover grayscale-25"
                />
            <CardHeader>
                <CardTitle>{map.name.toLocaleUpperCase()}</CardTitle>
                <CardDescription>{map.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button 
                    className="w-full cursor-pointer hover:bg-muted-foreground transition-colors duration-150 ease-in-out"
                    onClick={() => handleNavigate()}
                    >
                    Play Game
                </Button>
            </CardFooter> */}
        </Skeleton>
    )
}