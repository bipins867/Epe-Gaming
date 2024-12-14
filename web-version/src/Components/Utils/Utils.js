import React, { useEffect } from 'react';

export const PageComponent = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <></>
  );
};
