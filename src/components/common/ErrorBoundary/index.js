import React from 'react';

import ErrorBoundaryScreen from '@screens/error/ErrorBoundaryScreen';

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
      return <ErrorBoundaryScreen />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
