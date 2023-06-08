import { Button, Card, Divider, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CustomInput } from '../customInputs/CustomInput'
import { FormData, formSchema } from '../types/types'

export const Form = () => {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  })

  const submitForm = (data: FormData) => {
    console.log(data)
  }

  return (
    <Card
      w="100vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
      m="10"
    >
      <Text fontSize="3xl">Compliance registration form</Text>
      <Divider mt="5" color="gray.200" />

      <form onSubmit={handleSubmit(submitForm)}>
        <VStack p="20" align="start">
          <CustomInput
            label="Company name"
            placeholder="Company co."
            name="companyName"
            control={control}
          />
          <CustomInput
            label="Corporation date"
            name="corporationDate"
            control={control}
            type="date"
          />
          <Button
            type="submit"
            isDisabled={!formState.isValid}
            colorScheme="teal"
            size="lg"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Card>
  )
}
