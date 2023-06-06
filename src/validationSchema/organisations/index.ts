import * as yup from 'yup';
import { documentValidationSchema } from 'validationSchema/documents';
import { invoiceValidationSchema } from 'validationSchema/invoices';
import { organisationUserValidationSchema } from 'validationSchema/organisation-users';
import { reportValidationSchema } from 'validationSchema/reports';

export const organisationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  document: yup.array().of(documentValidationSchema),
  invoice: yup.array().of(invoiceValidationSchema),
  organisation_user: yup.array().of(organisationUserValidationSchema),
  report: yup.array().of(reportValidationSchema),
});
