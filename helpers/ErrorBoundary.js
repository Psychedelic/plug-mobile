import React from 'react';

class ErrorBoundary extends React.Component {
  state = {hasError: null};

  static getDerivedStateFromError(error) {
    return {hasError: error};
  }

  componentDidCatch(error, info) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }
  // A fake logging service 😬
  logErrorToServices = console.log;
  render() {
    if (this.state.hasError) {
      return <Text>Oops</Text>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
