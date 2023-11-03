import i18next from "i18next";
import React from "react";
import Lottie from "react-lottie";
import successAnimation from "../public/96237-success.json";

const Success: React.FC = () => {
  const { t } = i18next;

  const successContent = t('success.submit.text') as string[];

  return (
    <div className="m-10 flex-row items-center justify-center">
      <div dangerouslySetInnerHTML={{ __html: successContent.join('') }} />
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: successAnimation,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={400}
      />
    </div>
  );
};

export default Success;
