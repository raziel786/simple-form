import { ClaimFormState, IncidentType } from "../Types";
import Card from "./Card";

interface ClaimListProps {
  claims: ClaimFormState[];
}

export default function ClaimList({ claims }: ClaimListProps) {
  if (!claims.length) return null;

  return (
    <>
      <h2>Existing Claims</h2>
      {claims.map(({ id, date, type, otherType, description }) => (
        <Card
          key={id}
          aria-label={`Claim filed on ${date ? new Date(date).toDateString() : "unknown date"}`}
        >
          <div style={{ padding: '8px 0' }}>
            <strong>Claim Date:</strong>{" "}
            {date ? new Date(date).toDateString() : "No date provided"}
          </div>
          <div style={{ paddingBottom: 8 }}>
            <strong>Type:</strong>{" "}
            {type === IncidentType.Other ? `Other - ${otherType}` : type}
          </div>
          <div style={{ paddingBottom: 8 }}>
            <strong>Description:</strong> {description}
          </div>
        </Card>
      ))}
    </>
  );
}
