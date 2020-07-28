import React, {Component} from 'react';
import './homepage.style.scss';
import axios from 'axios';
import SearchForm from '../../components/search-form/search-form.component';
import ListItems from '../../components/listItems/list-item.component';

class HomePage extends Component {
    state = {
        query: '',
        recipes: []
    };

    /* The second way to call axios
        getRecipes = async () => {
            const recipe = await axios.get(`https://forkify-api.herokuapp.com/api/search?&q=${this.state.query}`);
            return recipe;
            //await fetch('https://type.fit/api/quotes');
        } 
    */
 
    handleButton = (event) => {
        event.preventDefault();
        const getRecipes = async () => {
            return await axios.get(`https://forkify-api.herokuapp.com/api/search?&q=${this.state.query}`);
        };
        getRecipes()
        .then(recipe => {
            /* Testing for result got from axios*/
            console.log(recipe.data.recipes);
            this.setState( {recipes: recipe.data.recipes} );
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleInput = (event) => {
        /* Testing for target value
        console.log(event.target.value); */
        this.setState({query: event.target.value})
    }

    render() {
        return (
            <div className='homepage'>
                <h1 className='heading'>Welcome to Forkify</h1>
                <SearchForm 
                    handleButton={this.handleButton}
                    handleInput={this.handleInput}
                    typeButton='submit'
                    typeInput='search'
                />  
                <div className='list-items'>
                    <ListItems items={this.state.recipes}></ListItems>
                </div>
            </div>
        );
        
    };
}

export default HomePage;