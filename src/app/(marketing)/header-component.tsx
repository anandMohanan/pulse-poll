import { Button, buttonVariants } from "@/components/ui/button";
import { primary_font, secondary_font } from "@/lib/font";
import { cn } from "@/lib/utils";
import { ChevronRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export const HeaderSection = () => {

    return (
        <div className='min-h-screen flex flex-col justify-around gap-4 items-center '>
            <div className="flex flex-col gap-4">
                <h1 className={cn("text-4xl text-center md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
                    primary_font.className)}>
                    Share your ideas, Get feedback.
                </h1>
                <p className={cn("text-3xl md:text-xl text-center tracking-tight w-[50%] m-auto", secondary_font.className)}>
                    Pulse Poll is a platform where you can share your ideas
                    and get feedback from the community. Share your thoughts, get likes and dislikes, and engage with others.
                </p>
            </div>
            <div className="flex flex-col justify-between gap-6">
                <Lightbulb className="h-36 w-36 text-yellow-300" />
                <Link className={cn(buttonVariants(), "hover:scale-105", primary_font.className)} href="/signin"> 
                Get Started <ChevronRight className="ml-2 h-4 w-4" /> </Link>
            </div>
        </div >
    );

}
