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

  const handleHogClick = (hog) => {
    setSelectedHog(hog);
  };

  const handleAddHog = (newHog) => {
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
      <Form onAddHog={handleAddHog} />
      
      <div className="ui grid">
        <div className="eight wide column">
          <Filter 
            showGreasedOnly={showGreasedOnly} 
            setShowGreasedOnly={setShowGreasedOnly} 
          />
        </div>
        <div className="eight wide column">
          <Sort 
            sortType={sortType} 
            setSortType={setSortType} 
          />
        </div>
      </div>

      {/* Show number of hidden hogs and option to reset */}
      {hiddenHogs.size > 0 && (
        <div className="ui message">
          <p>
            {hiddenHogs.size} hog(s) hidden. 
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
            <div className="ui card" onClick={() => handleHogClick(hog)}>
              <div className="image">
                <img src={hog.image} alt={hog.name} />
              </div>
              <div className="content">
                <h3 className="header">{hog.name}</h3>
                <button
                className="ui right floated mini button"
                onClick={(e) => handleToggleHide(e, hog.id)}>Hide</button>
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

      {/* Show message when no hogs are visible */}
      {displayedHogs.length === 0 && (
        <div className="ui message">
          <p>No hogs to display. {hiddenHogs.size > 0 && 'Try showing hidden hogs.'}</p>
        </div>
      )}
    </div>
  );
}

export default Home;