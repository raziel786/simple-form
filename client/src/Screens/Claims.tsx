import { useState } from 'react';
import Button from '../Components/Button';
import CalendarPicker from '../Components/CalendarPicker';
import CategoryPicker from '../Components/CategoryPicker';
import DescriptionField from '../Components/DescriptionField';
import { useClaims, usePostClaim } from '../Hooks';
import { initialClaimFormState } from '../Utils/Constants';
import { ClaimFormErrors, organiseClaimsByDate, validateClaimForm } from '../Utils/Utils';

import ClaimList from '../Components/ClaimsList';
import ErrorMessage from '../Components/ErrorMessage';
import { ClaimFormState, IncidentType } from '../Types';

const styles = {
  container: {
    padding: 64
  }
}
export default function Claims() {
  const [formState, setFormState] = useState<ClaimFormState>(initialClaimFormState);
  const { date, type, otherType, description } = formState;
  const [errors, setErrors] = useState<ClaimFormErrors>({});

  const { claims, setClaims, loading, claimsError } = useClaims();
  const { submitClaim, error: postError } = usePostClaim();
  const { dateError, typeError, otherTypeError, descriptionError } = errors;

  /**
   * Fields can vary by initial value i.e. select date
   * is null by default, but on selection, a date is utilised to update
   * the field. Other fields are typed so naturally are strings.
   */
  const updateField = (key: string, value: string | Date | null) => {
    setFormState(prevState => ({ ...prevState, [key]: value }));
    // Clear error when the user updates the field
    setErrors(prevState => ({ ...prevState, [key]: "" }));

  };

  /**
   * For consistancy, claims are ordered in `date claim` order.
   */
  const organisedClaimsByDate = organiseClaimsByDate(claims);

  const handleSubmit = async () => {
    const validationErrors = validateClaimForm(formState);
    /**
     * if validation fails, then do not perform update,
     * rather, display errors for the associated fields
     */
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    /**
     * API will return an updated list of claims upon successful submission,
     * in which we will update the claim state but clear out the fields 
     * selected fields by the user to prevent duplicate submission
     */
    const updatedClaims = await submitClaim(formState);

    if (!updatedClaims) return;

    setClaims(updatedClaims);
    setFormState(initialClaimFormState);
    alert("Claim submitted!");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Claims Handling Form</h1>
      <CalendarPicker
        label="Claim Date"
        placeholder="Select Claim Date"
        maxDate={new Date()}
        selectedDate={date}
        onChange={(value) => updateField("date", value)}
        errorMessage={dateError}
        aria-describedby="Select Claim Date"
      />
      <CategoryPicker
        label="Category"
        options={Object.values(IncidentType)}
        value={type}
        onChange={(value) => updateField("type", value as IncidentType)}
        showOtherFieldFor={IncidentType.Other}
        otherValue={otherType}
        onOtherChange={(value) => updateField("otherType", value)}
        otherLabel="Other (please specify)"
        errorMessage={type === IncidentType.Other ? otherTypeError : typeError}
      />
      <DescriptionField
        label="Incident Description"
        value={description}
        onChange={(value) => updateField("description", value)}
        placeholder="Describe what happened..."
        errorMessage={descriptionError}
        rows={6}
      />
      <Button
        label="Submit"
        onClick={handleSubmit}
        ariaLabel="Submit claim form"
      />
      {/** if the server falls over, or it fails to retrieve claims/post claim, then display an error */}
      <ErrorMessage message={postError || claimsError} />
      {/** only show claims title and content if there is anything to show */}
      <ClaimList claims={organisedClaimsByDate} />
    </div>
  );
}
