import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:8080/graphql'
})

console.log(client)

client
  .mutate({
    mutation: gql`
      mutation TestQuery {
        sendMessage(message: "Welcome from frontend!")
      }
    `
  })
  .then(result => console.log(result))

  export default client
