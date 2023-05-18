import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ children, onClick }) => (
    <Btn
        type="button"
        onClick={onClick}
    >
        {children}
    </Btn>
);

Button.propTypes = {
    Children: PropTypes.node,
    onClick: PropTypes.func.isRequired
}
