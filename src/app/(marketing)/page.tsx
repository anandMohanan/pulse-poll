import { DiscoverIdeaEffect } from "@/components/discover-idea-effect";
import { DiscoverIdeas } from "@/components/discover-ideas";
import { FooterComponent } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { validateRequest } from "@/lib/validateRequest";
import Image from "next/image";
import { redirect } from "next/navigation";
import { HeaderSection } from "./header-component";

export default async function Home() {
    return (
        <>
            <HeaderSection />
            <FooterComponent />
        </>
    );
}
