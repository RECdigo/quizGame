import './App.css'
import Start from "./Components/Start.js"
import React, { useState, useEffect } from 'react'
import Game from "./Components/Game.js"
import soundCorrect from "./Sounds/correct.mp3"
import soundWrong from "./Sounds/wrong.mp3"

function App() {
  const [start, setStart] = useState(false)
  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [correct, setCorrect] = useState("")
  const [nivel, setNivel] = useState(0)
  const [count, setCount] = useState(0)
  let difficulty = 'easy'
  const [endGame, setEndGame] = useState("")
  const [inputValue, setInputValue] = useState('')
  const [btnDisabled, setBtnDisabled ] = useState(false)
  let [scoreWan, setScoreWan] = useState(0.000)
  let backgroundColor = ''
  const[toggleNewGame, setToggleNewGame] = useState(false)
  const [win, setWin] = useState(false) 

  const handleInputValueChange = (value) => {

    setInputValue(value)

  }

  function Correct() {

    new Audio(soundCorrect).play()

  }

  function Wrong() {

    new Audio(soundWrong).play()

  }


  useEffect(() => {

    setCount(60)

  }, [start, nivel])

  const toggleStart = () => {

    setStart((prevStart) => !prevStart)

  }

  useEffect(() => {

    if (nivel <= 3) {difficulty = 'easy'}
    if (nivel > 3 && nivel <= 6) {difficulty = 'medium'}
    if (nivel > 6) {difficulty = 'hard'}

    fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple&category=9`)
      .then(response => response.json())
      .then(data => {
        const quizData = data.results[0] 
        setQuestion(quizData.question)     
        const allAnswers = [...quizData.incorrect_answers, quizData.correct_answer];    
        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)
        setCorrect(quizData.correct_answer)
        setAnswers(shuffledAnswers)        
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [nivel, toggleNewGame])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    if (count <0 && start ==true ) setEndGame("lost")
    if (count >=55) setBtnDisabled(true)
    if (count <55 && endGame != "lost") setBtnDisabled(false)
    if (win==true) setBtnDisabled(true)    

    return () => clearInterval(intervalId);
  }, [count])

  const handleAnswerClick = (selectedAnswer) => {
    
    if (selectedAnswer === correct) {
      setNivel((prevNivel) => prevNivel + 1)
      Correct()
    }
    
    if (selectedAnswer != correct) {

      setEndGame("lost")
      setBtnDisabled(true)
      Wrong()    

    }

    if (nivel >= 9) {

      setEndGame("win")
      setBtnDisabled(true)

    }

    setSelectedAnswer(selectedAnswer)

  }

  const exit = () => {
    
    window.location.reload();
    
  }

  const newGame = () => {
    
    setEndGame('')
    setNivel(0)
    setCount(60)
    setBtnDisabled(false)
    setScoreWan(0)
    backgroundColor = 'transparent'
    setToggleNewGame(prevValue => !prevValue)
    setWin(false)
    
  }

  useEffect(() => {
    
    if (nivel === 1) setScoreWan(formatter.format(5000))
    if (nivel === 2) setScoreWan(formatter.format(10000))
    if (nivel === 3) setScoreWan(formatter.format(25000))
    if (nivel === 4) setScoreWan(formatter.format(50000))
    if (nivel === 5) setScoreWan(formatter.format(100000))
    if (nivel === 6) setScoreWan(formatter.format(200000))
    if (nivel === 7) setScoreWan(formatter.format(400000))
    if (nivel === 8) setScoreWan(formatter.format(800000))
    if (nivel === 9) {

      setScoreWan(formatter.format(1000000)) 
      setWin(true)

    }
    

  }, [nivel])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  })
  
  return (

    <div className="App">
      
      {start ? 

      <Game 
      timeToAns={count}
      question={question}
      answers={answers}
      onAnswerClick={handleAnswerClick}
      countTime={count} 
      correctAnswer={correct}
      selectedAnswer={selectedAnswer}
      nivel={nivel}  
      endGame={endGame}
      onInputValueChange={inputValue}
      exit={exit}
      newGame={newGame}
      btnDisabled={btnDisabled}  
      scoreWan={scoreWan} 
      backgroundColor={backgroundColor} 
      win={win}       
      /> : 
      
      <Start  toggleStart={toggleStart} 
      onInputValueChange={handleInputValueChange} /> }      
      
    </div>
    
  )
}

export default App;
