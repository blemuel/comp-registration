import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { Control, useController } from 'react-hook-form'

type Props = {
  label?: string
  name: string
  control: Control<any>
  helperText?: string
  type?: string
  register?: any
}

export const FileInput = ({
  label,
  name,
  control,
  helperText,
  type = 'file',
  register,
}: Props) => {
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const invalid = !!error?.message

  return (
    <VStack align="start" w="full">
      <FormControl isInvalid={invalid}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input
          id={name}
          name={name}
          isInvalid={invalid}
          type={type}
          {...register('file')}
        />
        {invalid ? (
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        ) : (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    </VStack>
  )
}
