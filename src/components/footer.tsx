import { cn } from "@/lib/utils"
import { TextDisperse } from "./text-disperse-effect"
import { primary_font, secondary_font } from "@/lib/font"
import Link from "next/link"
import { VoteIcon } from "lucide-react"

export const FooterComponent = () => {
    return (
        <div
            className='relative h-[800px] px-8 md:px-20 bg-red-800'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>
                <div className='h-[800px] flex flex-col justify-around sticky top-[calc(100vh-800px)]'>
                    <div>
                        <div className='flex shrink-0 gap-20'>
                            <div className='flex flex-col gap-2'>
                                <h3 className={cn('mb-2 uppercase text-[#ffffff80]', primary_font.className)} > App</h3>
                                <Link href={"/"} className={cn(secondary_font.className)}>Home</Link>
                                <Link href={"/polls"} className={cn(secondary_font.className)}>Polls</Link>
                                <Link href={"/profile"} className={cn(secondary_font.className)}>Profile</Link>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h3 className={cn('mb-2 uppercase text-[#ffffff80]', primary_font.className)} > Company</h3>
                                <Link href={"/"} className={cn(secondary_font.className)}>About</Link>
                                <Link href={"/"} className={cn(secondary_font.className)}>Manifesto</Link>
                                <Link href={"/"} className={cn(secondary_font.className)}>Github</Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-end '>
                        <TextDisperse>
                            <p className={cn('text-[14vw] leading-[0.8] text-bold ', primary_font.className)}>Pulse Poll</p>
                        </TextDisperse>
                        <p className={cn(secondary_font.className)}>©copyright 2014</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
