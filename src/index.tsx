import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ELearningPlayer from "./player";

ReactDOM.render(
  <React.StrictMode>
    <ELearningPlayer
      idStorage={'619c4bee64f88e8af8746287'}
      apiEndPoint={'https://elearning.dev.ovptek.vn'}
      autoPlay={true}
      token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE2Mzc2NjQ1NDUsImV4cCI6MTYzNzc1MDU0NX0.-JDsuk3ALhxdHsPF7dIMSbSGYfoq0MU6ZfXQCe0pEyo'}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
