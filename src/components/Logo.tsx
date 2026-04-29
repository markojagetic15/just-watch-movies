import React from 'react';

const Logo: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 224 50"
    width="224"
    height="50"
    aria-label="JustWatch Movies"
    role="img"
  >
    {/* outer glow */}
    <circle cx="25" cy="25" r="24" fill="#FBC500" fillOpacity="0.07" />
    {/* mid ring */}
    <circle cx="25" cy="25" r="19" fill="#FBC500" fillOpacity="0.18" />
    {/* main circle */}
    <circle cx="25" cy="25" r="14" fill="#FBC500" />
    {/* play triangle */}
    <polygon points="22,18 22,32 34,25" fill="#060E17" />

    {/* JUST – small, light, cyan-gray */}
    <text
      x="58"
      y="20"
      fontFamily="Poppins, sans-serif"
      fontSize="9"
      fontWeight="300"
      fill="#78A6B8"
      letterSpacing="4.5"
    >
      JUST
    </text>

    {/* WATCH – large, bold, white */}
    <text
      x="56"
      y="43"
      fontFamily="Poppins, sans-serif"
      fontSize="23"
      fontWeight="700"
      fill="white"
    >
      WATCH
    </text>

    {/* vertical divider */}
    <line
      x1="150"
      y1="30"
      x2="150"
      y2="46"
      stroke="#FBC500"
      strokeWidth="1"
      strokeOpacity="0.45"
    />

    {/* movies – small, gold */}
    <text
      x="158"
      y="43"
      fontFamily="Poppins, sans-serif"
      fontSize="10"
      fontWeight="500"
      fill="#FBC500"
      letterSpacing="2"
    >
      movies
    </text>
  </svg>
);

export default Logo;
