import React from 'react';
import FallbackComponent from '../components/FallbackComponent';

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
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
