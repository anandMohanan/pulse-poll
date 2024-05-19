import { validateRequest } from "@/lib/validateRequest"

const PollPage = async () => {
    const { user, session } = await validateRequest()
    console.log(user)
    console.log("session -------------------",session)
    return (
        <div>
            <h1>Polls</h1>
        </div>
    )
}

export default PollPage
