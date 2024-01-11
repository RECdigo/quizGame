import React, { useState, useEffect, useRef  } from 'react'
import {decode} from 'html-entities';
import Confetti from 'react-confetti'

function Game({question,
   answers, 
   countTime, 
   onAnswerClick, 
   correctAnswer, 
   selectedAnswer, 
   nivel, 
   endGame,
   onInputValueChange,
   exit,
   newGame,
   btnDisabled,
   scoreWan,
   backgroundColor,
   win}) {

  const isAnswerCorrect = selectedAnswer === correctAnswer
  const [score, setScore] = useState(0)
  const scoreIncrements = [1000000, 800000, 400000, 200000, 100000, 50000, 25000, 10000, 5000]
  const [lastQuestionCorrect, setLastQuestionCorrect] = useState(false)  

  const check = (selectedAnswer) => {

    onAnswerClick(selectedAnswer)

    if (selectedAnswer === correctAnswer) {

      updateScore();
      setLastQuestionCorrect(true);

    } else {

      setLastQuestionCorrect(false);

    }
  }

  const updateScore = () => {

    const correctAnswerIndex = answers.findIndex((answer) => answer === correctAnswer)

  }

  const getButtonStyle = (answer) => {

    const isSelected = selectedAnswer === answer
    const isCorrect = correctAnswer === answer    
    let buttonBackgroundColor = ''
    let buttonPointerEvents = 'auto'    
  
    if (endGame === 'lost') {

      buttonBackgroundColor = isSelected ? (isCorrect ? 'green' : 'red') : (isCorrect ? 'green' : '')

    }
  
    if (endGame === '') {

      buttonBackgroundColor = isSelected ? (isCorrect ? 'green' : 'red') : ''

    }
  
    
    if (countTime >= 55) {

      buttonBackgroundColor = 'Transparent'      
      buttonPointerEvents = 'none'

    }
  
    return {

      backgroundColor: buttonBackgroundColor,
      pointerEvents: buttonPointerEvents,

    }
  }
  

  const formatter = new Intl.NumberFormat('en-US', {

    style: 'currency',
    currency: 'USD',

  })

  const getMoneyDivStyle = (index) => {
      const scoreIncrements = [

        1000000, 
        800000, 
        400000, 
        200000, 
        100000, 
        50000, 
        25000, 
        10000, 
        5000

      ]
    
      let backgroundColor = ''      
  
      if (nivel === 1 && index === 8) {

        backgroundColor = 'Green' 

      }
      if (nivel === 2 && index === 7) {

        backgroundColor = 'Green' 

      } 
      if (nivel === 3 && index === 6) {

        backgroundColor = 'Green' 

      } 
      if (nivel === 4 && index === 5) {

        backgroundColor = 'Green' 

      } 
      if (nivel === 5 && index === 4) {

        backgroundColor = 'Green' 

      } 
      if (nivel === 6 && index === 3) {
        backgroundColor = 'Green' 
      } 
      if (nivel === 7 && index === 2) {

        backgroundColor = 'Green' 

      } 
      if (nivel === 8 && index === 1) {

        backgroundColor = 'Green' 

      } 
      if (nivel === 9 && index === 0) {

        backgroundColor = 'Green' 

      }   
  
      return {

        backgroundColor,    

      }      
    
  }

  return (
    <>
      <div className='mainGame'>    

        { win && <Confetti />}  

        <div className='qa'>

          <div className='space'>
            
            {win ==true ? <div className="endGame">Congratulations You Won !</div> : 
            endGame =="lost" ? <div className="endGame">Game Over !</div> :
             countTime}            
            
          </div>
          
          <div className='test'>
            <div className='ask'>{decode(question)}</div>
            
              <div className='answers'>
              {answers.map((answer, index) => (            
                  
                    <button
                      key={index}
                      style={getButtonStyle(answer, endGame)}
                      className='answersBtn'
                      onClick={() => {check(answer)}}
                      disabled={btnDisabled}
                      >
                      {decode(answer)}
                    </button>            
                 
                ))}

              </div>            

          </div>
          
        </div>

        <div className='points'>

          <div className='pointsMenu'>

            <button className='pointsBtn' onClick={exit}>EXIT</button>
            <button className='pointsBtn' onClick={newGame}>NEW GAME</button>

          </div>
          <div className='nameScore'>

            <div className='pointsName'>Name: {onInputValueChange}</div>
            <div className='score'>Score: {scoreWan}</div>

          </div>
          <div className='pointsScore'>

            {scoreIncrements.map((increment, index) => (
              <div key={index} className='money' style={getMoneyDivStyle(index)}>
                {`${formatter.format(increment)}`}
                
              </div>
            ))}

            <div className='showAnswer'>
              
              <div className='answerTest'>
                Answer to test: &nbsp;
              </div>
              <div className='answerTest'>
                {decode(correctAnswer)}
              </div>      
                
            </div>
            
          </div>
        
        </div>    

      </div>
      
    </>
  )
}

export default Game
