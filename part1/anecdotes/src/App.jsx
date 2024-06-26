import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const randomSelect = (setSelected, anecdotes) => {
  const newSelected = Math.floor(Math.random() * anecdotes.length)
  setSelected(newSelected)
}

const updatePoints = (points, selected, setPoints) => {
  setPoints(prevPoints => {
    const copy = [...prevPoints]
    copy[selected] += 1
    const maxIndex = points.indexOf(Math.max(...points))
    return copy
  })
}

const Header = ({text}) => <h1>{text}</h1>

const DisplayVotes = ({votes}) => {
  return (
    <div>
      has {votes} votes
    </div>
  )
}

const Anecdote = ({text, points}) => {
  return (
    <div>
      {text}
      <DisplayVotes votes={points}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const maxIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={() => randomSelect(setSelected, anecdotes)} text="next anecdote"/> 
      <Button handleClick={() => updatePoints(points, selected, setPoints)} text="vote"/>
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[maxIndex]} points={points[maxIndex]} />
    </div>
  )
}

export default App