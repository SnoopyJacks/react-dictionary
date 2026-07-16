import "./Synonyms.css";

export default function Synonyms({ synonyms = [] }) {
  const uniqueSynonyms = [...new Set(synonyms.filter(Boolean))];

  if (uniqueSynonyms.length === 0) {
    return null;
  }

  return (
    <div className="Synonyms">
      <h4>Synonyms</h4>

      <ul aria-label="Synonyms">
        {uniqueSynonyms.map((synonym) => (
          <li key={synonym}>{synonym}</li>
        ))}
      </ul>
    </div>
  );
}
