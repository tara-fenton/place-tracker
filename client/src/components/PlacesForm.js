import React from 'react';

export default (props) => {
  return (
    <div>
      <h2>Places Form</h2>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={props.onChange}
          value={props.name}
          id="name"
          name="name" />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          onChange={props.onChange}
          value={props.description}
          id="description"
          name="description" />
        <label htmlFor="visited">Visited</label>
        <input
          type="checkbox"
          onChange={props.onCheckBox}
          value={props.visited}
          id="visited"
          name="visited" />
        <label htmlFor="name">Address</label>
        <input
          type="text"
          onChange={props.onChange}
          value={props.address}
          id="address"
          name="address" />
        <input
          type="submit"
          value="Save Place" />
      </form>
    </div>
  )
}
