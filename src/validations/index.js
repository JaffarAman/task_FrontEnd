import * as Yup from "yup";

const yupValidation = {
  loginSchema: Yup.object({
    emailAddress: Yup.string().email().required(),
    password: Yup.string().required().max(16).min(6),
  }),
  signUpSchema: Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    emailAddress: Yup.string().email().required(),
    password: Yup.string().required().max(16).min(6),
  }),

  paymentDetailSchema: Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    dueDate: Yup.string().required(),
  }),
};

export default yupValidation;
