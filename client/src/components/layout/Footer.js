// if it doesn't need to use any lifecycle method, 
// you can use functional component

import React from 'react'

export default () => {
  return (
    // mt-5 = margin-top: 5, p-4 = padding: 4
    <footer className="bg-dark text-white mt-5 p-4 text-center">
    {/* you can invoke instance and substitute it at the same time */}
      Copyright &copy; {new Date().getFullYear()} Devconnector
    </footer>
  );
};
