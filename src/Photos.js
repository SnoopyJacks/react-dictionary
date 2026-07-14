import React from "react";
import "./Photos.css";

export default function Photos(props) {
  if (props.photos) {
    return (
      <section className="Photos">
        <div className="row">
          {props.photos.slice(0, 3).map(function (photo, index) {
            return (
              <div className="col-4" key={index}>
                <a
                  href={photo.src.original}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open full-size image of ${photo.alt || keyword}`}
                >
                  <img
                    src={photo.src.landscape}
                    className="img-fluid"
                    alt={photo.alt || `Photo illustrating ${keyword}`}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
