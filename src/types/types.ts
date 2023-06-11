import * as yup from 'yup'

export type Address = {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export type FormData = {
  firstName: string
  lastName: string
  email: string
  birthDate: string
  companyName: string
  corporationDate: string
  addressString: string
  address: Address
  file: FileList
}

export const formSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    birthDate: yup.date().required().max(new Date()),
    companyName: yup.string().required(),
    corporationDate: yup.date().required(),
    address: yup.object({
      street: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zip: yup.string().required(),
      country: yup.string().required(),
    }),
    file: yup.mixed().required(),
  })
  .required()
