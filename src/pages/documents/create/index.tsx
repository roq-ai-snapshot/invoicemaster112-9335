import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createDocument } from 'apiSdk/documents';
import { Error } from 'components/error';
import { documentValidationSchema } from 'validationSchema/documents';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';
import { getOrganisations } from 'apiSdk/organisations';
import { getUsers } from 'apiSdk/users';
import { DocumentInterface } from 'interfaces/document';

function DocumentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DocumentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDocument(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DocumentInterface>({
    initialValues: {
      file_name: '',
      file_type: '',
      file_size: 0,
      organisation_id: (router.query.organisation_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: documentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Document
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="file_name" mb="4" isInvalid={!!formik.errors?.file_name}>
            <FormLabel>File Name</FormLabel>
            <Input type="text" name="file_name" value={formik.values?.file_name} onChange={formik.handleChange} />
            {formik.errors.file_name && <FormErrorMessage>{formik.errors?.file_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="file_type" mb="4" isInvalid={!!formik.errors?.file_type}>
            <FormLabel>File Type</FormLabel>
            <Input type="text" name="file_type" value={formik.values?.file_type} onChange={formik.handleChange} />
            {formik.errors.file_type && <FormErrorMessage>{formik.errors?.file_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="file_size" mb="4" isInvalid={!!formik.errors?.file_size}>
            <FormLabel>File Size</FormLabel>
            <NumberInput
              name="file_size"
              value={formik.values?.file_size}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('file_size', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.file_size && <FormErrorMessage>{formik.errors?.file_size}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganisationInterface>
            formik={formik}
            name={'organisation_id'}
            label={'Select Organisation'}
            placeholder={'Select Organisation'}
            fetcher={getOrganisations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'document',
  operation: AccessOperationEnum.CREATE,
})(DocumentCreatePage);
