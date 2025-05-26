import { ClaimFormState, IncidentType } from '../Types';
import { organiseClaimsByDate, validateClaimForm } from './Utils';

describe("validateClaimForm", () => {
  describe("When form is valid", () => {
    it("Then it returns an empty errors object", () => {
      const validForm: ClaimFormState = {
        date: new Date(),
        type: IncidentType.AccidentalDamage,
        otherType: "",
        description: "Valid description",
      };
      const errors = validateClaimForm(validForm);
      expect(errors).toEqual({});
    });
  });

  describe("When date is null", () => {
    it("Then it returns dateError", () => {
      const form: ClaimFormState = {
        date: null,
        type: IncidentType.AccidentalDamage,
        otherType: "",
        description: "Description",
      };
      const errors = validateClaimForm(form);
      expect(errors).toHaveProperty("dateError", "Please select a date");
    });
  });

  describe("When type is empty", () => {
    it("Then it returns typeError", () => {
      const form: ClaimFormState = {
        date: new Date(),
        type: "",
        otherType: "",
        description: "Description",
      };
      const errors = validateClaimForm(form);
      expect(errors).toHaveProperty("typeError", "Category cannot be empty");
    });
  });

  describe("When type is Other but otherType is empty or whitespace", () => {
    it("Then it returns otherTypeError", () => {
      const form: ClaimFormState = {
        date: new Date(),
        type: IncidentType.Other,
        otherType: "   ",
        description: "Description",
      };
      const errors = validateClaimForm(form);
      expect(errors).toHaveProperty("otherTypeError", "Please specify the other category");
    });
  });

  describe("When description is empty or whitespace", () => {
    it("Then it returns descriptionError", () => {
      const form: ClaimFormState = {
        date: new Date(),
        type: IncidentType.AccidentalDamage,
        otherType: "",
        description: "    ",
      };
      const errors = validateClaimForm(form);
      expect(errors).toHaveProperty("descriptionError", "Description cannot be empty");
    });
  });
});

describe('organiseClaimsByDate', () => {
  const claims: ClaimFormState[] = [
    { date: new Date('2023-05-01'), type: IncidentType.Theft, otherType: '', description: 'desc 1' },
    { date: new Date('2022-12-15'), type: IncidentType.Loss, otherType: '', description: 'desc 2' },
    { date: new Date('2024-01-10'), type: IncidentType.AccidentalDamage, otherType: '', description: 'desc 3' },
  ];

  describe('When claims have valid dates', () => {
    it('Then they are sorted in ascending order by date', () => {
      const sorted = organiseClaimsByDate(claims);
      expect(sorted.map(c => c.date?.toISOString().slice(0, 10))).toEqual([
        '2022-12-15',
        '2023-05-01',
        '2024-01-10',
      ]);
    });
  });

  describe('When a claim has a null date', () => {
    it('Then it is sorted to the beginning', () => {
      const withNullDate: ClaimFormState[] = [
        ...claims,
        { date: null, type: IncidentType.Other, otherType: 'Vandalism', description: 'desc 4' },
      ];
      const sorted = organiseClaimsByDate(withNullDate);
      expect(sorted[0].date).toBe(null);
    });
  });
});
