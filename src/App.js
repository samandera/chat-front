import { gql, useMutation, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
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
  const [ messages, setMessages ] = useState([])
  const [ testMutation ] = useMutation(TestMutation, { variables: { message: 'Welcome from frontend!' } })
  const { data: subscriptionData } = useSubscription(TestSubscription)
  console.log(subscriptionData)
  useEffect(() => {
    if (subscriptionData && !messages.includes(subscriptionData.messageSent)) {
      setMessages([ ...messages, subscriptionData.messageSent ])
    }
  }, [ messages, setMessages, subscriptionData ])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {messages.map(message => <p>{message}</p>)}
        </div>
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
