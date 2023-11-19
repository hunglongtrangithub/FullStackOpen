import { useState } from 'react'


const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0)
    return <div>No feedback given</div>

  const all = good + bad + neutral
  const average = ((good - bad) / all).toFixed(1)
  const positive = `${(good / all * 100).toFixed(1)} %`

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={positive} />
      </tbody>
    </table>
  )
}


const Button = ({ handleClick, crit }) =>
  <button onClick={handleClick}>{crit}</button>


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} crit={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} crit={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} crit={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
