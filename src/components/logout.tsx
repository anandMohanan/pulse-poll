"use client"

import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { SignoutUserAction } from "@/server/user";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

export const LogoutComponent = () => {

    const { toast } = useToast()
    const { mutate: logoutUser, isPending: logoutPending } = useMutation({
        mutationFn: async () => {
            await SignoutUserAction()
            toast({
                title: "Success",
                description: "You have been signed out.",
                variant: "default",
            })
        },
        onError(error, variables, context) {
            toast({
                title: error.message,
                description: "Please try again.",
                variant: "destructive",
            })
        },
    })
    return (
        <>
            <Button variant="ghost" onClick={() => logoutUser()} >{logoutPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign Out</Button>
        </>
    )
};
