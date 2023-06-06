import * as yup from 'yup';

export const documentValidationSchema = yup.object().shape({
  file_name: yup.string().required(),
  file_type: yup.string().required(),
  file_size: yup.number().integer().required(),
  organisation_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
