import "./styles.scss";
import { DreamObject } from "../dreamData.ts";
import { useState } from "react";
import Search from "../search";

// create card component for dreams

interface Dream {
  dreamData: DreamObject[];
}

const Dreams = ({ dreamData }: Dream) => {
  const [activeDream, setActiveDream] = useState<DreamObject | null>(
    dreamData[0]
  ); // set initial active dream as first dream entry if it exists

  const handleDreamClick = (
    e: React.MouseEvent<HTMLLIElement>,
    clickedDream: DreamObject
  ) => {
    setActiveDream(clickedDream);
  };

  return (
    <section id="dreams">
      <h1>My Dreams</h1>
      <Search />
      <button>Add Dream</button>
      <div className="dream-entries-container">
        <ul className="dream-container">
          {dreamData.map((dream) => (
            <li
              key={dream.id}
              className="dream-entry"
              onClick={(e) => handleDreamClick(e, dream)}
            >
              <h3 className="dream-entry-title">
                {dream.id} {dream.title}
              </h3>{" "}
            </li>
          ))}
        </ul>
        <div className="active-dream-description">
          <button>Edit</button>
          <button>Delete</button>
          <p>{activeDream?.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Dreams;
