import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../../queries';
import SearchItem from './SearchItem';

class Search extends React.Component {
  state = {
    searchResults: [],
  };

  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResults: searchRecipes,
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <div className="App">
            <input
              onChange={async e => {
                e.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: e.target.value },
                });

                this.handleChange(data);
              }}
              type="search"
              className="search"
              placeholder="Search for Recipes"
            />
            <ul>
              {searchResults.map(recipe => (
                <SearchItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
