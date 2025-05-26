import { useState } from "react";
import { postClaim } from "../Api/Calls";
import { ClaimFormState } from "../Types";

export function usePostClaim() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitClaim = async (form: ClaimFormState) => {
    setLoading(true);
    setError(null);
    try {
      return await postClaim(form);
    } catch (e) {
      console.error(e);
      setError("Failed to submit claim. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitClaim, loading, error };
}
