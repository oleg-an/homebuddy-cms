import type { AllowedTimezones, Timezone } from 'shared/lib/timezones';
import type { Payment } from 'shared/lib/payment';

export interface NotificationsData {
  billingEmails: string[];
}

export interface IssueTokenRequestModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthenticatedManagerModel {
  id: number;
  fullName: string;
  email: string;
  hasCreditCard: boolean;
  hasArchivedInvoices: boolean;
  timezone: AllowedTimezones;
  featureFlags?: { budgetIncreaseEnabled: boolean; onboardingEnabled: boolean };
}

export type BlockingElements = 'toggle' | 'zips' | 'budget' | 'schedule';

export interface AuthenticatedContractorModel {
  id: number;
  fullName: string;
  companyName: string;
  phoneNumber: string;
  hasCreditCard: boolean;
  email: string;
  website: string;
  manager: AuthenticatedManagerModel | null;
  timezone: Timezone;
  createdAt: string;
  hasIntegrations: boolean;
  hasLeadsCampaigns: boolean;
  hasApptsCampaigns: boolean;
  hasSalesCampaigns: boolean;
  paymentMethod: Payment;
  timeLeftToBlocking: number;
  timeLeftToUnblocking: number;
  blockedElementsList: BlockingElements[];
  hasArchivedInvoices: boolean;
  featureFlags?: { budgetIncreaseEnabled: boolean; onboardingEnabled: boolean };
}

export interface UpdatePasswordModel {
  password: string;
  currentPassword: string;
  passwordConfirmation: string;
}

export type UpdateProfileModel = Pick<
  AuthenticatedContractorModel,
  'fullName' | 'phoneNumber' | 'email' | 'website' | 'timezone'
>;
