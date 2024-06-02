import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Header = (prop) => {
  return (
    <h1>{prop.text}</h1>
  )
}

const Statisticline = ({text, value}) => {
  if (text != "positive")
    return (
      <div>{text} {value}</div>
    )
  return (
    <div>{text} {value} %</div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = total / 3;
  const percentage = (good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <Statisticline text="good" value={good} />
      <Statisticline text="neutral" value={neutral} />
      <Statisticline text="bad" value={bad} />
      <Statisticline text="total" value={total} />
      <Statisticline text="average" value={average} />
      <Statisticline text="positive" value={percentage} />
    </div>
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
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App