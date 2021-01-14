import React from 'react';

const Logos = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      width="80px"
      height="120px"
      {...props}
    />
  );
};

export default Logos;
