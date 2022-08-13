import React, { useRef } from "react"
import Die from "./components/die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Preloader from "./components/Preloader"
import Counter from "./components/Counter"
import Highscore from "./components/Highscore"
import Button from "./components/button"
import { motion } from "framer-motion";
import SoundBar from "./components/SoundBar"
export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  React.useEffect(() => {
    const allDice = dice.every(dice => dice.isHeld)
    const firstValue = dice[0].value
    const allSame = dice.every(dice => dice.value === firstValue)
    if (allDice && allSame) {
      setTenzies(true)
    }
  }, [dice])

  const diceElements = dice.map((die) => <Die value={die.value}
    key={die.id}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)} />)

    // Generating New Dice 
  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDice())
    }
    return arr
  }
  // To roll dice 
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDice()
      }))
      setCount(prevCount => prevCount + 1)
    }
    else {
      setTenzies(false)
      setDice(allNewDice)
      setScore((prevHighScore) => {
        if (prevHighScore === 0) return count;
        if (prevHighScore > count) return count;
        if (prevHighScore < count) return prevHighScore;
      })
      setCount(0)
    }
  }
  // To hold the selected dice 
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }
  // Preloader
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

  // Count & Score 
  const [count, setCount] = React.useState(0)
  const [score, setScore] = React.useState(JSON.parse(localStorage.getItem("score")) || 0)

  React.useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score))
  }, [score])

  const [icon, setIcon] = React.useState(true)
    
  function toggleIcon() {
      setIcon(prevMode => !prevMode)
      setClick(!click)
      if(!click){
        ref.current.play();
      }
      else{
        ref.current.pause();
      }
  }

  const ref = useRef(null)
  const [click, setClick] = React.useState(false)

  return (
    <div className="OuterContainer">
      {loading ? <Preloader /> :
        <main>
          {tenzies && <Confetti className="confetti"/>}
          <SoundBar icon={icon} changeIcon={toggleIcon} reff={ref}/>
          <motion.h1
            animate={{ x: 0, scale: 1 }} initial={{ x: 400, scale: 0 }} transition={{ type: "spring", delay: 0.3 }}
            className="title">Tenzies</motion.h1>
          <motion.p
            animate={{ x: 0, scale: 1 }} initial={{ x: 400, scale: 0 }} transition={{ type: "spring", delay: 0.3 }}
            className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </motion.p>
          <Highscore score={score} />
          <motion.div
          animate={{scale:1}} initial={{scale:0}} transition={{type:"spring", delay:0.5}}
            className="dice-container">
            {diceElements}
          </motion.div>
          <Button
            rollDice={rollDice}
            tenzies={tenzies}
            />
          <Counter count={count} />
        </main>
      }
    </div>
  )
}