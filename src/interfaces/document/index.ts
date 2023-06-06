import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';

export interface DocumentInterface {
  id?: string;
  organisation_id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;

  organisation?: OrganisationInterface;
  user?: UserInterface;
  _count?: {};
}
