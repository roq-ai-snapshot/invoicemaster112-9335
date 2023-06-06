import { DocumentInterface } from 'interfaces/document';
import { InvoiceInterface } from 'interfaces/invoice';
import { OrganisationUserInterface } from 'interfaces/organisation-user';
import { ReportInterface } from 'interfaces/report';
import { UserInterface } from 'interfaces/user';

export interface OrganisationInterface {
  id?: string;
  name: string;
  user_id: string;
  document?: DocumentInterface[];
  invoice?: InvoiceInterface[];
  organisation_user?: OrganisationUserInterface[];
  report?: ReportInterface[];
  user?: UserInterface;
  _count?: {
    document?: number;
    invoice?: number;
    organisation_user?: number;
    report?: number;
  };
}
