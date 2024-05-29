"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { createPollAction } from "@/server/poll"
import { CreatePollType, createPollSchema } from "@/types/poll_types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

export const PollFormComponent = () => {
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
        <Form {...form}>
            <div className="flex flex-col gap-4 items-center">
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="items-center gap-4 mb-4">
                        <FormField
                            control={form.control}
                            name="pollTitle"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Poll Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your poll title" {...field} />
                                    </FormControl>
                                    <FormDescription>
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
                                    <FormLabel>Poll Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Describe the purpose of your poll" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Give a detailed description of your poll, including any necessary background information or instructions for participants. This helps respondents understand the context and purpose of the poll.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={createPollPending}>{createPollPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}Create Poll</Button>
                    </div>
                </form>
            </div>
        </Form>
    )
}

