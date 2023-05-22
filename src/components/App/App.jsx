import React, { useState } from "react";
import { AppContainer } from './App.styled';
import { ImageGallery } from 'components/ImageGallery';
import { Search } from 'components/Search';



export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');


    return (
    <AppContainer>
        <Search onSubmit={setSearchQuery}/>
            <ImageGallery searchQuery={searchQuery} />
    </AppContainer>
  );
};



