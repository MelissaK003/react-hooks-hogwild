import React from "react";

function Sort({ sortType, setSortType }) {
  return (
    <div className="ui segment mb-4">
      <div className="ui form">
        <div className="field">
          <label>Sort Hogs By:</label>
          <select 
            className="ui dropdown"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Sort;