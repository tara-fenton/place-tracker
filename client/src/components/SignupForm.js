import React from 'react';
import UserForm from './UserForm';

export default (props) => {
  return (
    <div>
      <UserForm
        onChange={props.handleUserChange}
        onSubmit={props.handleUserSubmit}
      />
    </div>
  )
}
