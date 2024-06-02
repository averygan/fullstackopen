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
  if (text != "positive" && text != "average")
    return (
      <>
        <td>{text}</td> 
        <td>{value}</td>
      </>
    )
  if (text == "average")
    return (
      <>
        <td>{text}</td> 
        <td>{value.toFixed(2)}</td>
      </>
    )
  return (
    <>
      <td>{text}</td> 
      <td>{value.toFixed(2)} %</td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const totalScore = (good * 1) + (bad * -1);
  const average = totalScore / total;
  const percentage = (good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tr><Statisticline text="good" value={good} /></tr>
      <tr><Statisticline text="neutral" value={neutral} /></tr>
      <tr><Statisticline text="bad" value={bad} /></tr>
      <tr><Statisticline text="total" value={total} /></tr>
      <tr><Statisticline text="average" value={average} /></tr>
      <tr><Statisticline text="positive" value={percentage} /></tr>
    </table>
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