import React from 'react';
import PropTypes from 'prop-types';

const Star = (props) => {
  let src;
  const { type } = props;
  if (type === 'full') src = 'https://s3.us-east-2.amazonaws.com/lairdnd-reservations/star.svg';
  if (type === 'half') src = 'https://s3.us-east-2.amazonaws.com/lairdnd-reservations/star-half-empty.svg';
  if (type === 'empty') src = 'https://s3.us-east-2.amazonaws.com/lairdnd-reservations/star-empty-2.svg';

  return (
    <img src={src} alt="star" height="10px" width="10px" />
  );
};

Star.propTypes = {
  type: PropTypes.string,
};

export default Star;
