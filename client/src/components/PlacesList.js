import React from 'react';

export default (props) => {
  return (
    <div>
      <h2>Places List</h2>
      {props.places.map(place => (
        <div
          className="place-detail"
          key={place.id}>
          <h3>Id: {place.id}</h3>
          <p>Name: { place.name }</p>
          <p>Description: { place.description }</p>
          <p>Visited: { place.visited }</p>
          <p>Address: { place.address }</p>
          <button onClick={() => props.onDelete(place.id)}>
            Delete Place
          </button>
        </div>
      ))}
    </div>
  )
};
