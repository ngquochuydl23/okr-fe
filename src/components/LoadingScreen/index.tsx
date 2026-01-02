import animationData from "../../assets/lotties/Loading.json";
import "./loading-screen.scss";
import { useLottie } from "lottie-react";

const LoadingScreen = () => {
  const { View } = useLottie({
    animationData: animationData,
    loop: true,
  });
  return (
    <div className="loading-view">
      <div className="inner-view">{View}</div>
    </div>
  );
};

export default LoadingScreen;
