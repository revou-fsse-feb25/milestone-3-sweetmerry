import React from 'react';

declare global {
  // This allows React fragments to work properly
  namespace JSX {
    interface IntrinsicAttributes {
      key?: React.Key;
    }
  }
  
  // Declare any global types here
}

export {}; 