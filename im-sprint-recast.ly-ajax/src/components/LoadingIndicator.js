import React from 'react';

const LoadingIndicator = () => (
  <div className="lds-container">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>로딩 중...</div>
  </div>
);

export default LoadingIndicator;
