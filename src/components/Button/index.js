import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container, Text } from './styles';

export default function Button({ children, loading, styles, ...rest }) {
  return (
    <Container styles={styles} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  styles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Button.defaultProps = {
  loading: false,
  styles: [],
};
