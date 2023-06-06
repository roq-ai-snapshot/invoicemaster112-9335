import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  report_name: yup.string().required(),
  report_type: yup.string().required(),
  report_date: yup.date().required(),
  organisation_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
