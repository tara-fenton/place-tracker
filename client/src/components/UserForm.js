import React from 'react';

export default (props) => {
  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={props.onChange}
          value={props.username}
          id="username"
          name="username" />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          onChange={props.onChange}
          value={props.password}
          id="password"
          name="password" />
        <input
          type="submit"
          value="Create User" />
      </form>
    </div>
  )
}
