import * as yup from 'yup'

export type FormData = {
  companyName: string
}

export const formSchema = yup
  .object()
  .shape({
    companyName: yup.string().required(),
    corporationDate: yup.date().required(),
  })
  .required()
