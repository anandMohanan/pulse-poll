"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { primary_font, secondary_font } from "@/lib/font"
import { cn } from "@/lib/utils"
import { createPollAction } from "@/server/poll"
import { CreatePollType, createPollSchema } from "@/types/poll_types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const PollFormComponent = ({ canCreate }: { canCreate: Boolean }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<CreatePollType>({
        resolver: zodResolver(createPollSchema),
        defaultValues: {
            pollTitle: "",
            pollDescription: "",
        }
    })
    const { mutate: createPoll, isPending: createPollPending } = useMutation({
        mutationFn: async (values: CreatePollType) => {

            await createPollAction({ values })
        },
        onError(error, variables, context) {

            toast({
                title: error.message,
                description: "Please try again.",
                variant: "destructive",
            })
        },
        onSuccess: () => {
            setIsOpen(false)
            toast({
                title: "Poll created",
                description: "We've created your poll for you.",
                variant: "default",
            })
        },
    })
    const onSubmit = async (values: CreatePollType) => {
        createPoll(values)
    }
    return (
        <>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger asChild>
                    {!canCreate ?
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {!canCreate && <Button variant="default" className={cn(primary_font.className)} disabled>Create Poll <Plus className="ml-2 h-4 w-4" /></Button>}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Upgrade to premium to create polls</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        :
                        <Button variant="default" className={cn(primary_font.className)}>Create Poll <Plus className="ml-2 h-4 w-4" /></Button>
                    }
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className={cn(primary_font.className)}>Create Poll</DialogTitle>
                        <DialogDescription className={cn(secondary_font.className)}>
                            Create a new poll
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <div className="flex flex-col gap-4 items-center">
                            <form onSubmit={form.handleSubmit(onSubmit)} >
                                <div className="items-center gap-4 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="pollTitle"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel className={cn(primary_font.className)}>Poll Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your poll title" {...field} />
                                                </FormControl>
                                                <FormDescription className={cn(secondary_font.className)}>
                                                    Provide a brief and descriptive title for your poll. This will be the main heading that participants see.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="items-center gap-4 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="pollDescription"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel className={cn(primary_font.className)}>Poll Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Describe the purpose of your poll" {...field} />
                                                </FormControl>
                                                <FormDescription className={cn(secondary_font.className)}>
                                                    Give a detailed description of your poll, including any necessary background information or instructions for participants. This helps respondents understand the context and purpose of the poll.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" className={cn(primary_font.className)} disabled={createPollPending}>{createPollPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}Create Poll</Button>
                                </div>
                            </form>
                        </div>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

