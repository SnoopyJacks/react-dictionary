import Meaning from "./Meaning";
import Phonetic from "./Phonetic";
import "./Results.css";

export default function Results({ results }) {
  if (!results?.word) {
    return null;
  }

  const meanings = Array.isArray(results.meanings) ? results.meanings : [];

  return (
    <section className="Results" aria-labelledby="result-word">
      <header className="Results-header">
        <h2 id="result-word">{results.word}</h2>

        <Phonetic phonetic={results.phonetic} />
      </header>

      {meanings.length > 0 ? (
        meanings.map((meaning, index) => {
          const headingId = `meaning-${index + 1}`;

          return (
            <section
              className="Results-meaning"
              key={`${meaning.partOfSpeech || "meaning"}-${index}`}
            >
              <Meaning meaning={meaning} headingId={headingId} />
            </section>
          );
        })
      ) : (
        <p>No definitions were returned for this word.</p>
      )}
    </section>
  );
}
