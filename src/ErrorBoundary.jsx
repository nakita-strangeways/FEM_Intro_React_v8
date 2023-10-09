import { Component } from 'react';

// This has to be a class component because there is no equivalent for 'getDerivedStateFromError' and 'componentDidCatch' in hooks at this time

class ErrorBoundary extends Component {
   state = { hasError: false };

   static getDerivedStateFromError() {
      return { hasError: true };
   }

   componentDidCatch(error, info) {
      // typically you would log this to TrackJS or something
      console.error('ErrorBoundary component caught error:', error, info);
   }
   render() {
      if (this.state.hasError) {
         return this.props.errorComponent;
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
