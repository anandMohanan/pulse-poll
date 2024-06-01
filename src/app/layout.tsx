import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MaxWidthWrapper from "@/components/maxwidthwrapper";
import { cn } from "@/lib/utils";
import { ReactQueryClientProvider } from "@/provider/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/provider/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pulse Poll",
    description: "Pulse Poll is a platform where you can share your ideas and get feedback from the community.Share your thoughts, get likes and dislikes, and engage with others. "
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "flex flex-col min-h-screen")}>
                <ReactQueryClientProvider>
                    <ThemeProvider attribute="class">
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </ReactQueryClientProvider>
            </body>
        </html>
    );
}
