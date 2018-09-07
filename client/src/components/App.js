import React from 'react';
import { Query } from 'react-apollo';
import posed from 'react-pose';
import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from './Recipe/RecipeItem';
import Spinner from './Spinner';

import './App.css';

const RecipeList = posed.ul({
  shown: {
    x: 0,
    staggerChildren: 100,
  },
  hidden: {
    x: '-100%',
  },
});

class App extends React.Component {
  state = {
    on: false,
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({
      on: !this.state.on,
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">Find Recipes You Love</h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            return (
              <RecipeList
                pose={this.state.on ? 'shown' : 'hidden'}
                className="cards"
              >
                {data.getAllRecipes.map(recipe => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </RecipeList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
