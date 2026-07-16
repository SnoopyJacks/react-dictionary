import "./Photos.css";

export default function Photos({ photos = [], keyword }) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="Photos" aria-labelledby="photos-title">
      <h2 id="photos-title">Images related to {keyword}</h2>

      <ul className="Photos-grid">
        {photos.slice(0, 3).map((photo) => {
          const imageUrl = photo?.src?.landscape;
          const originalUrl = photo?.src?.original;

          if (!imageUrl || !originalUrl) {
            return null;
          }

          const altText =
            photo.alt?.trim() || `Image illustrating the word ${keyword}`;

          return (
            <li key={photo.id || originalUrl}>
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full-size ${altText} in a new tab`}
              >
                <img
                  src={imageUrl}
                  alt={altText}
                  width="640"
                  height="427"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
