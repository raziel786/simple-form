import { ClaimFormState } from '../Types';

const BASE_URL = 'http://localhost:3000';
/**
 * Retrieve Claim
 */
export async function fetchClaims(): Promise<ClaimFormState[]> {
  const response = await fetch(`${BASE_URL}/claims`);
  if (!response.ok) {
    throw new Error(`Failed to fetch claims: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

/**
 * Submit Claim
 */

export async function postClaim(claim: ClaimFormState): Promise<ClaimFormState[]> {
  const response = await fetch(`${BASE_URL}/claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claim),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit claim: ${response.statusText}`);
  }
  const result = await response.json();
  return result.claims;
}
