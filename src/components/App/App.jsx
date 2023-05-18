import React, { Component } from "react";
import { AppContainer } from './App.styled';
import { ImageGallery } from 'components/ImageGallery';
import { Search } from 'components/Search';



export class App extends Component {
    state = {
        searchQuery: '',
    };

    handleFormSubmit = searchQuery => {
    this.setState({ searchQuery })
  };

    render() {
    return (
    <AppContainer>
        <Search onSubmit={this.handleFormSubmit}/>
            <ImageGallery searchQuery={this.state.searchQuery} />
    </AppContainer>
  );
  }
};



