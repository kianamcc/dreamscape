import { useState, useEffect } from "react";

import Search from "../search";

import "./styles.scss";

export interface DreamObject {
  _id: string;
  title: string;
  description: string;
}

export interface FormData {
  id?: string;
  title: string;
  description: string;
}

export interface Dream {
  filteredDreams: DreamObject[];
}

interface props {
  handleDreamFiltering: (filteredData: DreamObject[]) => void;
  filteredDreams: DreamObject[];
  allDreams: DreamObject[];
  deleteDream: (e: React.MouseEvent<HTMLButtonElement>, _id: string) => void;
  addDream: (
    e: React.MouseEvent<HTMLButtonElement>,
    formData: FormData
  ) => void;
  updateDream: (
    e: React.MouseEvent<HTMLButtonElement>,
    formData: DreamObject
  ) => void;
  error: boolean;
}

const Dreams = ({
  filteredDreams,
  allDreams,
  handleDreamFiltering,
  addDream,
  deleteDream,
  updateDream,
  error,
}: props) => {
  const [activeDream, setActiveDream] = useState<DreamObject>(
    filteredDreams[0] as DreamObject
  ); // set initial active dream as first dream entry if it exists
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [editStates, setEditStates] = useState(allDreams.map(() => false));
  const [editingMode, setEditingMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeDreamId, setActiveDreamId] = useState("");
  // const [search, setSearch] = useState("");
  const [useFilteredDisplay, setUseFilteredDisplay] = useState(false);

  const handleEditButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const clickedDream = allDreams[index];
    setActiveDreamId(clickedDream._id);
    setTitle(clickedDream.title);
    setDescription(clickedDream.description);
    setEditStates((prevEditStates) => {
      const newEditStates = Array(prevEditStates.length).fill(false); // Initialize all edit states to false
      newEditStates[index] = true; // Set the edit state for the clicked dream entry to true
      return newEditStates;
    });
  };

  const handleSaveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEditStates((prevEditStates) => Array(prevEditStates.length).fill(false));
    if (activeDreamId !== null) {
      updateDream(e, {
        _id: activeDreamId,
        title: title,
        description: description,
      });
      setActiveDream({
        _id: activeDreamId,
        title: title,
        description: description,
      });
    }
    console.log("Saving dream: ", "updated data", {
      title: title,
      description: description,
    });
  };

  const handleDreamClick = (
    e: React.MouseEvent<HTMLLIElement>,
    clickedDream: DreamObject
  ) => {
    if (!editingMode) {
      setActiveDream(clickedDream);
    }
  };

  const handleFormClick = () => {
    setShowForm((prev) => !prev);
    setFormData({
      title: "",
      description: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDreamsDisplay = (search: string) => {
    if (search.length) {
      setUseFilteredDisplay(true);
    } else {
      setUseFilteredDisplay(false);
    }
  };

  useEffect(() => {
    if (editStates.some((state) => state === true)) {
      setEditingMode(true);
    } else {
      setEditingMode(false);
    }
  }, [editStates]);

  useEffect(() => {
    setActiveDream(filteredDreams[0]);
  }, [filteredDreams]);

  return (
    <section id="dreams">
      <div className="dreams-header">
        <h1>My Dreams</h1>
      </div>
      <>
        {showForm && (
          <form className="dream-form">
            <div className="dream-form-container">
              <button className="form-close-button" onClick={handleFormClick}>
                Close
              </button>
              <input
                name="title"
                className={`form-input-box ${error ? "error" : ""}`}
                placeholder="Enter a title..."
                value={formData.title}
                onChange={handleFormChange}
              />
              <textarea
                name="description"
                value={formData.description}
                className="form-description-box"
                placeholder="What was the dream about?"
                onChange={handleFormChange}
              />
              <button
                className="form-submit-button"
                type="submit"
                onClick={(e) => {
                  addDream(e, formData);
                  handleFormClick();
                }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
        <div className="dream-entries-container">
          <div className="top">
            <Search
              filteredDreams={filteredDreams}
              allDreams={allDreams}
              handleDreamFiltering={handleDreamFiltering}
              handleDreamsDisplay={handleDreamsDisplay}
            />
            <button className="add-dream-button" onClick={handleFormClick}>
              Add a dream
            </button>
          </div>
          <div className="bottom">
            <ul className="dream-container">
              {/* {allDreams.map((dream, index) => (
                <li
                  key={dream._id}
                  className={`dream-entry ${
                    dream._id === activeDream?._id ? "active" : ""
                  } ${
                    editingMode && dream._id !== activeDream?._id
                      ? "inactive"
                      : ""
                  }`}
                  onClick={(e) => handleDreamClick(e, dream)}
                >
                  <h3 className="dream-entry-title">
                    <span className="dream-entry-number">No. {index + 1} </span>
                    <span
                      className="dream-entry-name"
                      style={{ fontWeight: 400 }}
                    >
                      {dream.title}
                    </span>
                  </h3>
                  <div className="dream-entry-buttons">
                    {editStates[index] ? (
                      <button onClick={(e) => handleSaveButtonClick(e)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={(e) => handleEditButtonClick(e, index)}>
                        Edit
                      </button>
                    )}
                    <button onClick={(e) => deleteDream(e, dream._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))} */}

              {useFilteredDisplay ? (
                <>
                  {filteredDreams.map((dream, index) => (
                    <li
                      key={dream._id}
                      className={`dream-entry ${
                        dream._id === activeDream?._id ? "active" : ""
                      } ${
                        editingMode && dream._id !== activeDream?._id
                          ? "inactive"
                          : ""
                      }`}
                      onClick={(e) => handleDreamClick(e, dream)}
                    >
                      <h3 className="dream-entry-title">
                        <span className="dream-entry-number">
                          No. {index + 1}{" "}
                        </span>
                        <span
                          className="dream-entry-name"
                          style={{ fontWeight: 400 }}
                        >
                          {dream.title}
                        </span>
                      </h3>
                      <div className="dream-entry-buttons">
                        {editStates[index] ? (
                          <button onClick={(e) => handleSaveButtonClick(e)}>
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleEditButtonClick(e, index)}
                          >
                            Edit
                          </button>
                        )}
                        <button onClick={(e) => deleteDream(e, dream._id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {allDreams.map((dream, index) => (
                    <li
                      key={dream._id}
                      className={`dream-entry ${
                        dream._id === activeDream?._id ? "active" : ""
                      } ${
                        editingMode && dream._id !== activeDream?._id
                          ? "inactive"
                          : ""
                      }`}
                      onClick={(e) => handleDreamClick(e, dream)}
                    >
                      <h3 className="dream-entry-title">
                        <span className="dream-entry-number">
                          No. {index + 1}{" "}
                        </span>
                        <span
                          className="dream-entry-name"
                          style={{ fontWeight: 400 }}
                        >
                          {dream.title}
                        </span>
                      </h3>
                      <div className="dream-entry-buttons">
                        {editStates[index] ? (
                          <button onClick={(e) => handleSaveButtonClick(e)}>
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleEditButtonClick(e, index)}
                          >
                            Edit
                          </button>
                        )}
                        <button onClick={(e) => deleteDream(e, dream._id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <div className="active-dream-description">
              {editStates.some((state) => state === true) ? (
                <>
                  {" "}
                  {editStates.map((index, i) => {
                    return (
                      index && (
                        <span key={`edit-dream ${i}`}>
                          <input
                            key={i}
                            name="edit-title"
                            className={`form-input-box ${error ? "error" : ""}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <textarea
                            name="edit-description"
                            value={description}
                            className="form-description-box"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </span>
                      )
                    );
                  })}
                </>
              ) : (
                <>
                  <h3>{activeDream?.title}</h3>
                  <div>{activeDream?.description}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default Dreams;
