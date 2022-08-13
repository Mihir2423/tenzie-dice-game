import React from 'react'
import { FcSpeaker } from "react-icons/fc";
import { BiVolumeMute } from "react-icons/bi";
import music from "../audio/audio.mp3"
import { motion } from "framer-motion";
export default function SoundBar(props) {
    return (
        <motion.div
        animate={{scale:1, x:0}} initial={{scale:0, x:300}} transition={{delay:0.4}}
        className='soundBox' onClick={props.changeIcon}>{!(props.icon )? <FcSpeaker/> : <BiVolumeMute/>}
            <audio src={music} ref ={props.reff} loop/>
        </motion.div>
    )
}
