import { ClaimFormState, IncidentType } from '../Types';

export const initialClaimFormState: ClaimFormState = {
  date: null,
  type: "" as "" | IncidentType,
  otherType: "",
  description: "",
};

