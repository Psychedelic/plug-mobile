import React from 'react';

import ConnectionError from '../../../screens/ConnectionError';

class ErrorBoundary extends React.Component {
  state = { hasError: null };

  static getDerivedStateFromError(error) {
    return { hasError: error };
  }

  componentDidCatch(error, info) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }
  // A fake logging service 😬
  logErrorToServices = console.log;
  render() {
    if (this.state.hasError) {
      return <ConnectionError />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
