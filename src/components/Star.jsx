import React from 'react';
import PropTypes from 'prop-types';

const Star = (props) => {
  let src;
  const { type } = props;
  if (type === 'full') src = 'assets/star.svg';
  if (type === 'half') src = 'assets/star-half-empty.svg';
  if (type === 'empty') src = 'assets/star-empty-2.svg';

  return (
    <img src={src} alt="star" height="10px" width="10px" />
  );
};

Star.propTypes = {
  type: PropTypes.string,
};

export default Star;
