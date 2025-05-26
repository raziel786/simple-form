import { ClaimFormState, IncidentType } from '../Types';

export interface ClaimFormErrors {
  dateError?: string;
  typeError?: string;
  otherTypeError?: string;
  descriptionError?: string;
}

export function validateClaimForm(form: ClaimFormState): ClaimFormErrors {
  const errors: ClaimFormErrors = {};

  if (form.date === null) {
    errors.dateError = "Please select a date";
  }

  if (!form.type) {
    errors.typeError = "Category cannot be empty";
  }

  if (form.type === IncidentType.Other && !form.otherType.trim()) {
    errors.otherTypeError = "Please specify the other category";
  }

  if (!form.description.trim()) {
    errors.descriptionError = "Description cannot be empty";
  }

  return errors;
}

export const organiseClaimsByDate = (claims: ClaimFormState[]) =>
  [...claims].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return aTime - bTime;
  });