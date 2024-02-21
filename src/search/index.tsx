import { DreamObject } from "../dreams";

import "./styles.scss";

interface props {
  handleDreamFiltering: (filteredData: DreamObject[]) => void;
  handleDreamsDisplay: (search: string) => void;
  filteredDreams: DreamObject[];
  allDreams: DreamObject[];
}

const Search = ({
  filteredDreams,
  allDreams,
  handleDreamFiltering,
  handleDreamsDisplay,
}: props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDreamsDisplay(e.target.value);
    if (e.target.value === "") {
      handleDreamFiltering(allDreams);
    } else {
      const filteredData = filteredDreams.filter((dream) =>
        dream.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

      if (filteredData.length) {
        handleDreamFiltering(filteredData);
      }
      console.log(filteredData);
    }
  };

  return (
    <section id="search">
      <input
        className="search-box"
        placeholder="Search dream"
        onChange={(e) => handleInputChange(e)}
      />
    </section>
  );
};

export default Search;
