import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
} from '../../queries';

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm('Are you sure?');

  if (confirmDelete) {
    deleteUserRecipe().then(({ data }) => {
      console.log(data);
    });
  }
};

const UserRecipes = ({ username }) => {
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;
        console.log(data);

        return (
          <ul>
            <h3>Your Recipes</h3>

            {data.getUserRecipes.map(recipe => (
              <li key={recipe._id}>
                <p>
                  <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                </p>
                <p style={{ marginBottom: 0 }}>Likes: {recipe.likes}</p>
                <Mutation
                  mutation={DELETE_USER_RECIPE}
                  variables={{ _id: recipe._id }}
                  refetchQueries={() => [
                    { query: GET_ALL_RECIPES },
                    { query: GET_CURRENT_USER },
                  ]}
                  update={(cache, { data: { deleteUserRecipe } }) => {
                    const { getUserRecipes } = cache.readQuery({
                      query: GET_USER_RECIPES,
                      variables: { username },
                    });

                    cache.writeQuery({
                      query: GET_USER_RECIPES,
                      variables: { username },
                      data: {
                        getUserRecipes: getUserRecipes.filter(
                          recipe => recipe._id !== deleteUserRecipe._id,
                        ),
                      },
                    });
                  }}
                >
                  {(deleteUserRecipe, attrs = {}) => (
                    <p
                      onClick={() => handleDelete(deleteUserRecipe)}
                      className="delete-button"
                    >
                      {attrs.loading ? 'deleting...' : 'X'}
                    </p>
                  )}
                </Mutation>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
