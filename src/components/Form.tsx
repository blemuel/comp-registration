import { Button, Card, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CustomInput } from '../customInputs/CustomInput'
import { FileInput } from '../customInputs/FileInput'
import { Search } from '../customInputs/Search'
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
          <Text fontSize="2xl">Personal Info</Text>
          <HStack display="flex" alignItems="end" w="full">
            <CustomInput
              label="First name"
              placeholder="Bene"
              name="firstName"
              control={control}
            />
            <CustomInput
              label="Last name"
              placeholder="Lemuel"
              name="lastName"
              control={control}
            />
          </HStack>
          <HStack display="flex" alignItems="end" w="full">
            <CustomInput
              label="E-mail"
              placeholder="contact@email.com"
              name="email"
              control={control}
            />
            <CustomInput
              label="Birth date"
              name="birthDate"
              control={control}
              type="date"
            />
          </HStack>
          <Divider mt="5" color="gray.200" />
          <Text fontSize="2xl">Company Info</Text>
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
          <Search control={control} />
          <FileInput
            label="Validation file"
            name="file"
            control={control}
            type="file"
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
