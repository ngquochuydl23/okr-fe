import animationData from "@/assets/lotties/Loading.json";
import "./loading-backdrop.scss";
import { useLottie } from "lottie-react";

interface LoadingBackdropProps {
  open: boolean;
}

const LoadingBackdrop = ({ open }: LoadingBackdropProps) => {
  if (!open) return null;
  const { View } = useLottie( {
    animationData: animationData,
    loop: true,
  });

  return (
    <div className="loading-backdrop">
      <div className="loading-backdrop__wrapper">{View}</div>
    </div>
  );
};

export default LoadingBackdrop;
