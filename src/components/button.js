import React from "react"
import { motion } from "framer-motion";

export default function Button(props) {
    return(
        <motion.button
        animate={{x:0, scale:1}} initial={{x:400, scale:0}}
        transition={{type:"spring", delay:0.3}}
        whileTap={{ scale: 0.9, x: "-5px", y: "5px" }} 
        className="roll-dice" 
        onClick={props.rollDice}>{
            !(props.tenzies) ? "Roll" : "New Game"}
        </motion.button>
    )
}