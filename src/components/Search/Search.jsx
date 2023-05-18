import { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { Form, FormBtn, Header, BtnLabel, Input } from "./Search.styled";

export class Search extends Component {
    state = {
        searchQuery: '',
    };

    handleSearchChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    } 

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            Notify.failure('Error');
            return;
        };

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    }

    render() {
        return (
            <Header>
                <Form onSubmit={this.handleSubmit}>
                    <FormBtn type="submit">
                        <BtnLabel>Search</BtnLabel>
                    </FormBtn>
                    <Input
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                    />
                </Form>
            </Header>
        )
    }
};

Search.propTypes = {
    onsubmit: PropTypes.func
};
