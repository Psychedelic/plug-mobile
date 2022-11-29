import React, { Component, ErrorInfo, ReactNode } from 'react';

import ErrorBoundaryScreen from '@/screens/error/ErrorBoundaryScreen';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }
  // A fake logging service 😬
  logErrorToServices = console.log;

  public render() {
    if (this.state.hasError) {
      return <ErrorBoundaryScreen />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
