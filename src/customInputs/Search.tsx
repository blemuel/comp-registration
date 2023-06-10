import { Box, Button, HStack } from '@chakra-ui/react'
import { Control } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getAddress } from '../redux/feature/addressSlice'
import { CustomInput } from './CustomInput'

type Props = {
  control: Control<any>
}

export const Search = ({ control }: Props) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getAddress({ query: 'Upanema' }))
  }

  return (
    <HStack display="flex" alignItems="end" w="full">
      <Box flex="2">
        <CustomInput
          label="Search address"
          placeholder="565 5th Ave, New York, NY 10017, United States"
          name="addressString"
          control={control}
        />
      </Box>
      <Button mb="2" flex="1" onClick={handleSubmit}>
        Search
      </Button>
    </HStack>
  )
}
