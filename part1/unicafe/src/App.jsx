import { useState } from 'react'

const Heading = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const FeedbackButton = (props) => {
  return (
    <button onClick={() => {props.setValue(props.value + 1)}}>{props.text}</button>
  )
}

const Feedback = (props) => {
  return (
  <>
    <Heading text={"give feedback"}/>
    <FeedbackButton text={"good"} value={props.good} setValue={props.setGood}/>
    <FeedbackButton text={"neutral"} value={props.neutral} setValue={props.setNeutral}/>
    <FeedbackButton text={"bad"} value={props.bad} setValue={props.setBad}/>
  </>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  return (
    <>
      <Heading text={"statistics"}/>
      <Statistic text={"good"} value={props.good} />
      <Statistic text={"neutral"} value={props.neutral} />
      <Statistic text={"bad"} value={props.bad} />
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