import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateRequest } from "@/lib/validateRequest"
import { Plus } from "lucide-react"
import { redirect } from "next/navigation"
import { PollFormComponent } from "./poll-form"
import { createPollValidate } from "@/server/queries/create_poll_validate"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PollComponent } from "./poll"
import { db } from "@/db"
import { CommentTable, PollTable, UserPollActionTable } from "@/db/schema/poll_schema"
import { and, eq, ne, notExists } from "drizzle-orm"
import { UserTable } from "@/db/schema/user_schema"
import { PollCommentsComponent } from "./poll-comments"
import { get_pollComments, get_pollDetailsforUsers } from "@/server/queries/poll_queries"

const PollPage = async () => {
    const { user } = await validateRequest()
    if (!user) {
        redirect("/signin")
    }
    const canCreate = await createPollValidate()
    console.log(canCreate, "dasdasda")

    const pollDetails = await get_pollDetailsforUsers()

    let pollComments;
    if (pollDetails) {
        pollComments = await get_pollComments({ pollId: pollDetails?.pollId! })
    }
    return (
        <div className="p-10">
            <div className="flex justify-between ">
                <h1> Polls </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        {!canCreate ?
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {!canCreate && <Button variant="default" disabled>Create Poll <Plus className="ml-2 h-4 w-4" /></Button>}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Upgrade to premium to create polls</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            :
                            <Button variant="default">Create Poll <Plus className="ml-2 h-4 w-4" /></Button>
                        }
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Poll</DialogTitle>
                            <DialogDescription>
                                Create a new poll
                            </DialogDescription>
                        </DialogHeader>
                        <PollFormComponent />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-10 justify-center items-center mt-20">
                {!pollDetails ? <p>No Polls to show currently</p> :
                    <>
                        <PollComponent pollData={pollDetails} />
                        <PollCommentsComponent pollId={pollDetails?.pollId!} comments={pollComments!} />
                    </>
                }

            </div>
        </div>
    )
}

export default PollPage
// <>
//     {canCreate && <Button variant="default">Create Poll <Plus className="ml-2 h-4 w-4" /></Button>}
//     {!canCreate &&
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger>
//                     {!canCreate && <Button variant="default" disabled>Create Poll <Plus className="ml-2 h-4 w-4" /></Button>}
//                 </TooltipTrigger>
//                 <TooltipContent>
//                     <p>Upgrade to premium to create polls</p>
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     }
// </>
