import Link from "next/link";
import {
    Cable,
    CableIcon,
    CircleUser,
    Menu,
    Package2,
    Search,
    VoteIcon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { validateRequest } from "@/lib/validateRequest";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogoutComponent } from "./logout";

export const Navbar = async () => {
    const { user } = await validateRequest()
    return (
        <div className="z-100">
            <header className="sticky top-0 flex h-16 items-center gap-4  px-4 md:px-6">
                <nav className="flex md:w-full items-center justify-between ">
                    <div className="hidden lg:flex gap-3 lg:flex-4">
                        <Link href={"/"} className=" text-lg font-semibold md:text-base">
                            <VoteIcon className="h-6 w-6" />
                            <span className="sr-only">Resume Sync</span>
                        </Link>
                        <div className="w-10 opacity-0 "></div>
                    </div>
                    <div className="hidden lg:flex m-auto   lg:gap-x-6">
                        <Link
                            href={`/polls`}
                            className="text-muted-foreground lg:ml-3 transition-colors hover:text-foreground"
                        >
                            Polls
                        </Link>
                        <Link
                            href={`/pricing`}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Pricing
                        </Link>
                    </div>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className=" shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <VoteIcon className="h-6 w-6" />
                                <span className="sr-only">Resume Sync</span>
                            </Link>
                            <Link
                                href={`/polls`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Polls
                            </Link>
                            <Link
                                href={`/pricing`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Pricing
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full md:w-auto justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <ThemeToggle />
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <Avatar>
                                        <AvatarFallback>{user.username[0].toUpperCase()}{user.username[1].toUpperCase()} </AvatarFallback>
                                    </Avatar>

                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{user.username} </DropdownMenuLabel>
                                <DropdownMenuItem><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    {" "}
                                    <LogoutComponent />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link
                                href={"/signin"}
                                className={buttonVariants({ size: "sm" })}

                            >
                                Sign In
                                <span className="sr-only">Login</span>
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
};

