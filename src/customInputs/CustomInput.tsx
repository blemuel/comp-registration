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
  placeholder?: string
  name: string
  control: Control<any>
  helperText?: string
  type?: string
}

export const CustomInput = ({
  label,
  placeholder,
  name,
  control,
  helperText,
  type = 'text',
}: Props) => {
  const {
    field: { onChange, onBlur, value, ref },
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
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          isInvalid={invalid}
          type={type}
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
