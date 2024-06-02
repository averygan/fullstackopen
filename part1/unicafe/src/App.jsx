import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Header = (prop) => {
  return (
    <h1>{prop.text}</h1>
  )
}

const Display = ({text, stats}) => {
  if (text != "positive")
    return (
      <div>{text} {stats}</div>
    )
  return (
    <div>{text} {stats} %</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Leave your feedback:" />
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="Statistics" />
        <Display text="good" stats={good} />
        <Display text="neutral" stats={neutral} />
        <Display text="bad" stats={bad} />
        <Display text="total" stats={good + bad + neutral} />
        <Display text="average" stats={(good + bad + neutral) / 3} />
        <Display text="positive" stats={good / (good + bad + neutral) * 100} />
    </div>
  )
}

export default App