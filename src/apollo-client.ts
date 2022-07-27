import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'

const httpLink = createHttpLink({
  uri: 'https://gitlab.freedesktop.org/api/graphql'
})

const cache = new InMemoryCache()

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage)
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})
