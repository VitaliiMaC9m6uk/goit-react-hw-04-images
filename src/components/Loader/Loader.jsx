import { Circles } from 'react-loader-spinner';
export const Loader = ({ isLoading }) => {
  return (
    <Circles
      height="80"
      width="80"
      color="#198dd0"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={isLoading}
    />
  );
};
