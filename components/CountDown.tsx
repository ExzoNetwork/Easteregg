import i18next from "i18next";
import moment from "moment";
import React, { useEffect } from "react";

const DATE_FORMAT = "YYYY-MM-DDTHH:mmZ";

interface SVGCircleProps {
  radius: number;
}

const SVGCircle: React.FC<SVGCircleProps> = ({ radius }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="#4b50e6"
      strokeWidth="4"
      d={describeArc(25, 25, 23, 0, radius)}
    />
  </svg>
);

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(
  number: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

type props = {
  finishAirdrop: () => void;
}

const CountDown: React.FC<props> = ({ finishAirdrop }) => {
  const { t } = i18next

  const timeTillDate = process.env.NEXT_PUBLIC_TIME_TILL_DATE  //"2022-07-05T16:55:00+03:00"

  const [state, setState] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const daysText = t('days');
  const hoursText = t('hours');
  const minutesText = t('minutes');
  const secondsText = t('seconds');

  useEffect(() => {

    const interval = setInterval(() => {
      const then: any = moment(timeTillDate, DATE_FORMAT);
      const now: any = moment();

      const days = then.diff(now, 'days') % 360 <= 0 ? 0 : then.diff(now, 'days') % 360;
      const hours = then.diff(now, 'hours') % 24 <= 0 ? 0 : then.diff(now, 'hours') % 24;
      const minutes = then.diff(now, 'minutes') % 60 <= 0 ? 0 : then.diff(now, 'minutes') % 60;
      const seconds = then.diff(now, 'seconds') % 60 <= 0 ? 0 : then.diff(now, 'seconds') % 60;

      if (!days && !hours && !minutes && !seconds) {
        finishAirdrop();
        clearInterval(interval);
      }

      setState({ days, hours, minutes, seconds });
    }, 1000);
  }, []);

  const daysRadius = mapNumber(+state.days, 360, 0, 0, 360);
  const hoursRadius = mapNumber(+state.hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(+state.minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(+state.seconds, 60, 0, 0, 360);

  return (
    <div className="flex items-center justify-around flex-wrap mb-5">
      <div className="countdown-item">
        <SVGCircle radius={daysRadius} />
        {state.days}
        <span>{daysText}</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={hoursRadius} />
        {state.hours}
        <span>{hoursText}</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={minutesRadius} />
        {state.minutes}
        <span>{minutesText}</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={secondsRadius} />
        {state.seconds}
        <span>{secondsText}</span>
      </div>
    </div>
  );
};

export default CountDown;
