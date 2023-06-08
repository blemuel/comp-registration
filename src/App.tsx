import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { Form } from './components/Form'
import { store } from './redux/store'

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3} justifyContent="center">
          <Form />
        </Grid>
      </Box>
    </ChakraProvider>
  </Provider>
)
