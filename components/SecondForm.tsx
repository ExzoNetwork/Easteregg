import i18next from "i18next";
import { useState } from "react";
import { INSTAGRAM_LINK, TELEGRAM_PROFILE_LINK, FACEBOOK_LINK, TWITTER_PROFILE_LINK } from "../global-config";

interface props {
  prev: () => void;
  next: () => void;
}

const Second: React.FC<props> = ({ prev, next }) => {
  const { t } = i18next;
  const prevText = t('general.prev');
  const nextText = t('general.next');

  const [error, setError] = useState("");
  const [state, setState] = useState([
    {
      title: "Follow us on twitter",
      className: "bg-twitter",
      clicked: false,
      link: TWITTER_PROFILE_LINK,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
        </svg>
      ),
    },
    {
      title: "Follow us on Instagram",
      className: "bg-white border border-twitter text-twitter",
      clicked: false,
      link: INSTAGRAM_LINK,
      icon: (
          <svg fill="#833AB4" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"/></svg>
      ),
    },
    {
      title: "Follow us on Telegram",
      className: "bg-telegram",
      clicked: false,
      link: TELEGRAM_PROFILE_LINK,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
        </svg>
      ),
    },
    {
      title: "Follow us on Facebook",
      className: "bg-discord",
      clicked: false,
      link: FACEBOOK_LINK,
      icon: (
          <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"/></svg>
      ),
    }
  ]);

  const callNext = () => {
    if (state.find((item) => !item.clicked)) {
      setError(t('secondform.error.text'));
    } else {
      setError("");
      next();
    }
  };

  return (
    <div className="">
      {state.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            window.open(item.link, "_blank");
            setState(
              state.map((item, stateIndex) => {
                return index == stateIndex ? { ...item, clicked: true } : item;
              })
            );
          }}
          disabled={item.clicked}
          className={`text-white rounded-2xl my-5 text-center font-medium text-lg  p-3 flex items-center justify-center w-full ${item.className
            } ${item.clicked && "cursor-not-allowed opacity-70"} `}
        >
          <span className="mx-1">{item.icon}</span>
          <span className="mx-1">{item.title}</span>
        </button>
      ))}

      {error && (
        <p className="bg-red-50 text-center w-full rounded-lg p-3 border border-red-600 text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => prev()}
          className="
                      px-6
                      py-2
                      mt-4
                      text-sm
                      font-medium
                      leading-5
                      text-center text-primary
                      transition-colors
                      duration-150
                      bg-white
                      border border-primary
                      rounded-lg
                      focus:outline-none
                    "
        >
          {prevText}
        </button>
        <button
          type="button"
          onClick={callNext}
          className="
                      px-6
                      py-2
                      mt-4
                      text-sm
                      font-medium
                      leading-5
                      text-center text-white
                      transition-colors
                      duration-150
                      bg-warn
                      border border-transparent
                      rounded-lg
                      hover:bg-blue-700
                      focus:outline-none
                    "
        >
          {nextText}
        </button>
      </div>
    </div>
  );
};

export default Second;
