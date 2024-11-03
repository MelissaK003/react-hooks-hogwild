import React from "react";

function Filter({ showGreasedOnly, setShowGreasedOnly }) {
  return (
    <div className="ui segment mb-4">
      <div className="ui toggle checkbox">
        <input
          type="checkbox"
          checked={showGreasedOnly}
          onChange={() => setShowGreasedOnly(!showGreasedOnly)}
          id="greased-filter"
        />
        <label htmlFor="greased-filter">
          Show Only Greased Hogs
        </label>
      </div>
    </div>
  );
}

export default Filter;