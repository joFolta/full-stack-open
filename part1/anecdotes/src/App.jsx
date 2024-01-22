import { useState, useEffect } from 'react'

const Heading = (props) => <h2>{props.text}</h2>

const RandomButton = (props) => {
  /**
   * https://stackoverflow.com/a/1527820/11559806
   * 
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <button onClick={() => {props.setSelected(getRandomInt(0, props.anecdotes.length-1))}}>next anecdote</button>
  )
}

const VoteButton = (props) => {
  // make a copy of the state to not change the original array
  const copy = [...props.points]
  // increment the value in position "selected" by one
  copy[props.selected] += 1    

  return (
    <button onClick={() => {props.setPoints(copy)}}>vote</button>
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
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [mostVotes, setMostVotes] = useState(null)

  useEffect(() => {
    function findIndexWithMostVotes() {
      // short-circuit to preserve "No votes have been cast" message
      const sum = points.reduce((partialSum, a) => partialSum + a, 0);
      if (sum === 0) return null

      let largest = points[0]
      let indexWithMostVotes = 0

      for (let i=0; i<points.length; i++) {
        if (points[i] > largest) {
          largest = points[i]
          indexWithMostVotes = i
        }
      }

      return indexWithMostVotes
    }

    const indexWithMostVotes = findIndexWithMostVotes()

    setMostVotes(indexWithMostVotes)
  }
  , [points])

  return (
    <div>
      <Heading text="Anecdote of the day" />
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <VoteButton selected={selected} points={points} setPoints={setPoints} />
        <RandomButton anecdotes={anecdotes} setSelected={setSelected} />
      </div>

      <Heading text="Anecdote with the most votes" />
      {mostVotes === null ? <p>No votes have been cast</p>
      :
      <>
        {anecdotes[mostVotes]}
        <p>has {points[mostVotes]} votes</p>
      </>
    }
    </div>
  )
}

export default App