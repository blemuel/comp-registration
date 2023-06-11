import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import {
  Control,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress, resetAddress } from '../redux/feature/addressSlice'
import { AppDispatch, RootState } from '../redux/store'
import { FormData } from '../types/types'
import { CustomInput } from './CustomInput'

type Props = {
  control: Control<any>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  setError: UseFormSetError<FormData>
}

export const Search = ({ control, watch, setValue, setError }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, address, success, error } = useSelector(
    (state: RootState) => state.address
  )

  const watchAddressString = watch('addressString')

  useEffect(() => {
    if (error)
      setError('addressString', {
        message: 'Please, enter a valid address',
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    setValue('address', address)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const handleSubmit = () => {
    dispatch(resetAddress())
    dispatch(getAddress({ query: watchAddressString }))
  }

  return (
    <VStack display="flex" alignItems="start" w="full">
      <HStack display="flex" alignItems="end" w="full">
        <Box flex="2">
          <CustomInput
            label="Search address"
            placeholder="565 5th Ave, New York, NY 10017, United States"
            name="addressString"
            control={control}
          />
        </Box>
        <Button
          colorScheme="teal"
          isDisabled={!watchAddressString}
          isLoading={loading}
          mb="2"
          flex="1"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </HStack>
      <VStack align="start">
        {success &&
          Object.keys(address).map((key) => (
            <HStack key={key}>
              <Text fontSize="medium" fontWeight="bold" textColor="gray.700">
                {key.toUpperCase()}:
              </Text>
              <Text fontSize="medium" fontWeight="light" textColor="gray.700">
                {address[key as keyof typeof address]}
              </Text>
            </HStack>
          ))}
      </VStack>
    </VStack>
  )
}
