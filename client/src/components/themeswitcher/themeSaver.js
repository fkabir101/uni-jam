import React from 'react';

function ThemeSaver(props) {
  return (
    <link rel="stylesheet" type="text/css" href={props.stylePath} />
  )
}

export default ThemeSaver;