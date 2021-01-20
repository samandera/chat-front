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
  const [ inputValue, setInputValue ] = useState('')
  const [ messages, setMessages ] = useState([])
  const [ testMutation ] = useMutation(TestMutation)
  const { data: subscriptionData } = useSubscription(TestSubscription)
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
        <input
          onChange={e => { setInputValue(e.currentTarget.value) }}
          value={inputValue}
        />
        <button
          className="App-link"
          onClick={() => testMutation({ variables: { message: inputValue } })}
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
