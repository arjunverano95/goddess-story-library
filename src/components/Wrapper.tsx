import React from 'react';

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}
const Wrapper = ({children}: WrapperProps) => {
  return <>{children}</>;
};
export default Wrapper;
