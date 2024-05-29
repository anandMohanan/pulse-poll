"use client"

import { useState } from "react";
import { motion } from "framer-motion"
import { disperse } from "@/lib/text-disperse-anim";

export const TextDisperse = ({ children }) => {
    const [isAnimated, setIsAnimated] = useState(false)
    const getChars = (element) => {
        let chars = [];
        const word = element.props.children
        word.split('').forEach((char: string, i: number) => {
            chars.push(<motion.span custom={i} variants={disperse} animate={isAnimated ? "open" : "closed "} key={char + i}>{char}</motion.span>)

        })
        return chars
    }
    const manageMouseEnter = () => {
        setIsAnimated(true)
    }

    const manageMouseLeave = () => {
        setIsAnimated(false)
    }
    return (
        <div style={{ cursor: "pointer" }} onMouseEnter={() => { manageMouseEnter() }} onMouseLeave={() => { manageMouseLeave() }} className='introLine'>
            {getChars(children)}
        </div>
    )
}
