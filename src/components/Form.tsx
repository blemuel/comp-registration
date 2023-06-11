import {
  Button,
  Card,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { CustomInput } from '../customInputs/CustomInput'
import { FileInput } from '../customInputs/FileInput'
import { Search } from '../customInputs/Search'
import { resetAddress } from '../redux/feature/addressSlice'
import { resetForm, submitFormAction } from '../redux/feature/formSlice'
import { AppDispatch, RootState } from '../redux/store'
import { FormData, formSchema } from '../types/types'

export const Form = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { loading, formData, success } = useSelector(
    (state: RootState) => state.form
  )

  useEffect(() => {
    setIsModalOpen(success)
  }, [success])

  const {
    control,
    handleSubmit,
    formState,
    watch,
    setValue,
    reset,
    register,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      companyName: '',
      corporationDate: '',
      addressString: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      },
      file: undefined,
    },
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  })

  const submitForm = async (data: FormData) => {
    data = {
      ...data,
      birthDate: new Date(data.birthDate).toLocaleDateString(),
      corporationDate: new Date(data.corporationDate).toLocaleDateString(),
    }
    await dispatch(submitFormAction(data))
  }

  const handleClose = () => {
    setIsModalOpen(false)
    dispatch(resetForm())
    dispatch(resetAddress())
    reset()
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
          <Search
            control={control}
            watch={watch}
            setValue={setValue}
            setError={setError}
          />
          <FileInput
            label="Validation file"
            name="file"
            control={control}
            register={register}
          />
          <Button
            type="submit"
            isDisabled={!formState.isValid}
            colorScheme="teal"
            size="lg"
            isLoading={loading}
          >
            Submit
          </Button>
        </VStack>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="550px">
          <ModalCloseButton />
          <ModalHeader>Data sent!</ModalHeader>
          <ModalBody p="10">
            <Text fontSize="2xl">
              Hi {formData.firstName}, data successfully sent!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  )
}
