import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";

// components
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import {
    FieldGroup,
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// motion
import { AnimatePresence, motion } from "motion/react"

// schemas
import { victorySchema } from "@/components/schemas/victorySchema"

// types
import type { TSession } from "@/types/TSession";

export function GameComplete({ gameSession }: { gameSession: TSession}) {
    const form = useForm<z.infer<typeof victorySchema>>({
        resolver: zodResolver(victorySchema),
        defaultValues: {
            name: ""
        },
        mode: "onChange",
    });

    async function handleSubmit(data: z.infer<typeof victorySchema>) {

    }

    return (
        <AnimatePresence>
            <div
                className="w-screen h-screen bg-popover/75
                fixed top-0 left-0
                flex justify-center items-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 1000 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 40,
                    }}
                    className="md:w-md w-xs h-[80%]"
                >
                    <Card className="w-full h-fit p-8">
                        <CardHeader className="text-center">
                            <CardTitle className="text-4xl"> VICTORY </CardTitle>
                            <CardDescription> Enter your name to the leaderboard! </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <FieldGroup>
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel> Name </FieldLabel>
                                                <Input 
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Player"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Field>
                                        <Button type="submit">
                                            Submit
                                        </Button>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}