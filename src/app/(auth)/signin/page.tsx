import { validateRequest } from "@/lib/validateRequest";
import { SigninForm } from "./signin-form";
import { redirect } from "next/navigation";

const SignInPage = async () => {
    const { user } = await validateRequest()
    if (user) {
        redirect("/polls")
    }
    return (
        <>
            <SigninForm />
        </>
    )
};



export default SignInPage;
