import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingIndicator = () => {
  return <Loader type="TailSpin" color="#902923" height="45" width="45" />;
};

export default LoadingIndicator;
