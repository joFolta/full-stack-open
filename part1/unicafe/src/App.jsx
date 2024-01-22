import { useState } from 'react'

const Heading = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => {props.setValue(props.value + 1)}}>{props.text}</button>
  )
}

const Feedback = (props) => {
  return (
  <>
    <Heading text="give feedback"/>
    <Button text="good" value={props.good} setValue={props.setGood}/>
    <Button text="neutral" value={props.neutral} setValue={props.setNeutral}/>
    <Button text="bad" value={props.bad} setValue={props.setBad}/>
  </>
  )
}

// a proper place to define a component
const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const PercPositive = (props) => {
  return (
    <p>positive {props.value} %</p>
  )
}
 
const Statistics = (props) => {
  return (
    <>
      <Heading text="statistics"/>

      {(props.good || props.neutral || props.bad) ? 
      <>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
        <PercPositive value={props.good/(props.good + props.neutral + props.bad) * 100} />
      </>
      : <p>No feedback given</p>}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App