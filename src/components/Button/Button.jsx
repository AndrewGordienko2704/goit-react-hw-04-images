import { Btn } from './Button.styled';
import PropTypes from 'prop-types';
export const Button = ({ loadMore }) => <Btn onClick={loadMore}>loadMore</Btn>;

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
};