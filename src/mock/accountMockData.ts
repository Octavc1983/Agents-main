import type { AccountUser, AccountOrganization } from '../types/prototype.types';

export const mockAccountUser: AccountUser = {
  id: 'usr_98765',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@company.com',
  phone: '+15551234567',
  avatarUrl: '',
  role: 'Workspace Admin',
  is2faEnabled: false,
};

export const mockAccountOrganization: AccountOrganization = {
  id: 'org_11223',
  name: 'Acme Corp',
  taxId: 'US123456789',
  address: {
    street: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'United States',
  },
};
