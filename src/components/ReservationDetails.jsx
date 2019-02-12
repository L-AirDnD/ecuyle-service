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

  const { offering: { pricePerDay, averageRating, totalReviewCount } } = props;
  return (
    <div>
      <Wrapper>
        <Title2>
          $
          { pricePerDay }
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

ReservationDetails.propTypes = {
  offering: PropTypes.object,
};

export default ReservationDetails;
