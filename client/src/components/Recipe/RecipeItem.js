import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const RecipeItem = posed.li({
  shown: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});

export default ({ _id, name, imageUrl, category }) => (
  <RecipeItem
    pose
    style={{
      background: `url(${imageUrl}) center center / cover no-repeat`,
    }}
    className="card"
  >
    <span className={category}>{category}</span>
    <div className="card-text">
      <Link to={`/recipes/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </RecipeItem>
);
