import React from "react"
import { motion } from "framer-motion";

export default function Counter(props) {
    return (
        <motion.div 
        animate={{opacity:1, x:0}} initial={{opacity:0, x:300}} transition={{delay:0.3}}
        className="counter">
            <p>Roll Count : {props.count}</p>
        </motion.div>
    )
}