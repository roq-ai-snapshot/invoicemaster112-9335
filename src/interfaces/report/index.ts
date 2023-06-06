import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';

export interface ReportInterface {
  id?: string;
  organisation_id: string;
  user_id: string;
  report_name: string;
  report_type: string;
  report_date: Date;

  organisation?: OrganisationInterface;
  user?: UserInterface;
  _count?: {};
}
