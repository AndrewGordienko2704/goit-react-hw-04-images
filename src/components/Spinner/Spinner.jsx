import { RotatingLines } from 'react-loader-spinner';

export function Spinner() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="36"
      visible={true}
    />
  );
}