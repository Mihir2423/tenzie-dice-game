import React from "react"
import { motion } from "framer-motion";

export default function Highscore(props) {
    return (
        <motion.div
            animate={{ x: 0, scale: 1 }} initial={{ x: 200, scale: 0 }} transition={{ type: "spring", delay: 0.3 }}
            className="high-score">
            <p>🏆 HighScore : {props.score}</p>
        </motion.div>
    )
}