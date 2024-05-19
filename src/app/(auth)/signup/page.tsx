import { validateRequest } from "@/lib/validateRequest";
import { SignupForm } from "./signup-form"
import { redirect } from "next/navigation";

const SignUpPage = async () => {
    const { user } = await validateRequest()
    if (user) {
        redirect("/polls")
    }
    return (

        <>
            <SignupForm />
        </>
    )
};



export default SignUpPage;
