import React, { useState } from "react";
import hogs from "../porkers_data";
import Filter from "./Filter";
import Sort from "./Sort";
import Form from "./Form";

function Home() {
  const [selectedHog, setSelectedHog] = useState(null);
  const [showGreasedOnly, setShowGreasedOnly] = useState(false);
  const [sortType, setSortType] = useState("");
  const [allHogs, setAllHogs] = useState(hogs);
  const [hiddenHogs, setHiddenHogs] = useState(new Set());

  const handleViewDetails = (e, hog) => {
    e.stopPropagation();
    setSelectedHog(selectedHog === hog ? null : hog);
  };

  const AddHog = (newHog) => {
    setAllHogs([...allHogs, newHog]);
  };

  const handleToggleHide = (e, hogId) => {
    e.stopPropagation();
    
    setHiddenHogs(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(hogId)) {
        newHidden.delete(hogId);
      } else {
        newHidden.add(hogId);
      }
      return newHidden;
    });
  };

  const displayedHogs = allHogs
    .filter(hog => !hiddenHogs.has(hog.id))
    .filter(hog => !showGreasedOnly || hog.greased)
    .sort((a, b) => {
      switch (sortType) {
        case "name":
          return a.name.localeCompare(b.name);
        case "weight":
          return a.weight - b.weight;
        default:
          return 0;
      }
    });

  return (
    <div className="ui container my-5">
      <div className="ui stackable grid">
        <div className="sixteen wide column">
          <div className="ui segment">
            <Filter showGreasedOnly={showGreasedOnly} setShowGreasedOnly={setShowGreasedOnly} />
          </div>
          <div className="ui segment">
            <Sort sortType={sortType} setSortType={setSortType} />
          </div>
        </div>
      </div>

      {hiddenHogs.size > 0 && (
        <div className="ui message">
          <p>
            {hiddenHogs.size} hog(s) hidden.{" "}
            <button
              className="ui button small primary ml-3"
              onClick={() => setHiddenHogs(new Set())}
            >
              Show All Hogs
            </button>
          </p>
        </div>
      )}

      <div className="ui grid">
        {displayedHogs.map((hog) => (
          <div className="ui eight wide column" key={hog.id}>
            <div className="ui card">
              <div className="image">
                <img src={hog.image} alt={hog.name} />
              </div>
              <div className="content">
                <h3 className="header">{hog.name}</h3>
                <div className="ui two buttons">
                  <button 
                    className="ui basic blue button"
                    onClick={(e) => handleViewDetails(e, hog)}
                  >
                    {selectedHog === hog ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    className="ui basic red button"
                    onClick={(e) => handleToggleHide(e, hog.id)}
                  >
                    Hide
                  </button>
                </div>
              </div>
              {selectedHog === hog && (
                <div className="extra content">
                  <p><strong>Specialty:</strong> {hog.specialty}</p>
                  <p><strong>Weight:</strong> {hog.weight}</p>
                  <p><strong>Greased:</strong> {hog.greased ? 'True' : 'False'}</p>
                  <p><strong>Highest medal:</strong> {hog.highest_medal_achieved}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {displayedHogs.length === 0 && (
        <div className="ui message">
          <p>No hogs to display. {hiddenHogs.size > 0 && 'Try showing hidden hogs.'}</p>
        </div>
      )}

      <div className="ui segment">
        <Form onAddHog={AddHog} />
      </div>
    </div>
  );
}

export default Home;