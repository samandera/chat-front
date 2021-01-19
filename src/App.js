import { gql, useMutation, useSubscription } from '@apollo/client'
import React from 'react'
import logo from './logo.svg'
import './App.css'

const TestMutation = gql`
  mutation TestMutation($message: String!) {
    sendMessage(message: $message)
  }
`

const TestSubscription = gql`
  subscription TestSubscription {
    messageSent
  }
`

function App() {
  const [testMutation, { data }] = useMutation(TestMutation, { variables: { message: 'Welcome from frontend!' } })
  const { data: subscriptionData, loading } = useSubscription(TestSubscription)
  console.log(subscriptionData)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={() => testMutation().then(data => { console.log(data) })}
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
