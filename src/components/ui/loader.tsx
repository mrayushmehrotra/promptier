import CountUp from "@/components/CountUp";
import { useEffect, useState } from "react";

interface LoaderProps {
  children: React.ReactNode;
}

const LoaderWrapper = ({ children }: LoaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return loading ? (
    <div className="flex items-center h-screen justify-center">
      <CountUp
        from={0}
        to={100}
        separator=","
        direction="up"
        duration={1}
        className="font-bold text-3xl count-up-text"
        startWhen={true}
      />
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoaderWrapper;
