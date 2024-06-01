import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { primary_font, secondary_font } from "@/lib/font"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

const PricingPage = () => {
    return (
        <main className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="space-y-6 md:space-y-10">
                <div className="text-center space-y-3">
                    <h1 className={cn("text-3xl md:text-4xl font-bold tracking-tight", primary_font.className)}>Simple Pricing for Your Business</h1>
                    <p className={cn("text-gray-500 dark:text-gray-400 max-w-xl mx-auto", secondary_font.className)}>
                        Whether you're just starting out or running an established enterprise, our pricing plans are tailored to
                        your needs.
                    </p>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400"> Pricing Soon </span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-100 dark:bg-black p-6 md:p-8 rounded-xl shadow-lg">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className={cn("text-2xl md:text-3xl font-bold", primary_font.className)}>Free</h3>
                            </div>
                            <p className={cn("text-gray-500 dark:text-gray-400", primary_font.className)}>For individuals and small teams just getting started.</p>
                            <div className={cn("space-y-2", secondary_font.className)}>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 fill-primary" />
                                    <span>Create 5 polls per day</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 fill-primary" />
                                    <span> View 10 polls a day</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 fill-primary" />
                                    <span>Basic analytics</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl md:text-5xl font-bold">$0</span>
                                <span className="text-gray-500 dark:text-gray-400">/ month</span>
                            </div>
                            <Button className="w-full " disabled>Sign up for free</Button>
                        </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-950 p-6 md:p-8 rounded-xl shadow-lg">
                        <div className="space-y-4">
                            <div className={cn("flex items-center justify-between", primary_font.className)}>
                                <h3 className="text-2xl md:text-3xl font-bold">Pro</h3>
                                <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</div>
                            </div>
                            <p className={cn("text-gray-500 dark:text-gray-400", primary_font.className)}>For premium features.</p>
                            <div className={cn("space-y-2", secondary_font.className)}>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 fill-primary" />
                                    <span>Create upto 10 polls a day</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 fill-primary" />
                                    <span>View upto 20 polls a day</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 fill-primary" />
                                    <span>Advanced analytics</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl md:text-5xl font-bold">$49</span>
                                <span className="text-gray-500 dark:text-gray-400">/ month</span>
                            </div>
                            <Button className="w-full " disabled>Get started</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}


export default PricingPage
