import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { Form, FormBtn, Header, BtnLabel, Input } from "./Search.styled";

export const Search = ({onSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (searchQuery.trim() === '') {
            Notify.failure('Error');
            return;
        };

        onSubmit(searchQuery);
        setSearchQuery('');
    };
        return (
            <Header>
                <Form onSubmit={handleSubmit}>
                    <FormBtn type="submit">
                        <BtnLabel>Search</BtnLabel>
                    </FormBtn>
                    <Input
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Form>
            </Header>
        )
};
    
Search.propTypes = {
    onsubmit: PropTypes.func
};
