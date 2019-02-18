import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import {
  StyledLine,
  Wrapper,
  TopWrapper,
  Title2,
  Paragraph,
  Stars,
} from '../styles/common';

const ReservationDetails = (props) => {
  const padWithEmptyStars = (stars) => {
    for (let i = stars.length; i < 5; i += 1) {
      stars.push(<Star key={i} type="empty" />);
    }
    return stars;
  };

  const getStars = (averageRating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(averageRating); i += 1) {
      stars.push(<Star key={i} type="full" />);
    }
    if (averageRating - Math.floor(averageRating) > 0.5) {
      stars.push(<Star key={stars.length} type="half" />);
    }
    return padWithEmptyStars(stars);
  };

  const { pricePerDay, averageRating, totalReviewCount } = props;

  return (
    <div>
      <Wrapper>
        <Title2 id="pricePerDay">
          { `$${pricePerDay}` }
        </Title2>
        <Paragraph> per night</Paragraph>
      </Wrapper>
      <TopWrapper>
        <Stars>
          { getStars(averageRating) }
        </Stars>
        <Paragraph>
          { totalReviewCount }
        </Paragraph>
      </TopWrapper>
      <StyledLine />
    </div>
  );
};

ReservationDetails.defaultProps = {
  pricePerDay: 0,
  averageRating: 0,
  totalReviewCount: 0,
};

ReservationDetails.propTypes = {
  pricePerDay: PropTypes.number,
  averageRating: PropTypes.number,
  totalReviewCount: PropTypes.number,
};

export default ReservationDetails;
