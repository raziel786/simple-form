import { useEffect, useState } from 'react';
import { fetchClaims } from '../Api/Calls';
import { ClaimFormState } from '../Types';

export function useClaims() {
  const [claims, setClaims] = useState<ClaimFormState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadClaims() {
      try {
        const data = await fetchClaims();
        setClaims(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load claims. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadClaims();
  }, []);

  return { claims, setClaims, loading, claimsError: error };
}
