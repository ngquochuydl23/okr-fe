import "./loading-screen.scss";
import { Spinner } from '@radix-ui/themes'

const LoadingScreen = () => {
  return (
    <div className="loading-view">
      <Spinner size="3" />
    </div>
  );
};

export default LoadingScreen;
