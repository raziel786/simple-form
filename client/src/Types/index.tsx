export enum IncidentType {
  Theft = "Theft",
  AccidentalDamage = "Accidental Damage",
  Loss = "Loss",
  Other = "Other",
}

export interface ClaimFormState {
  id?: number,
  date: Date | null;
  type: IncidentType | "";
  otherType: string;
  description: string;
}