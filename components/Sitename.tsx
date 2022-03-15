/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";

interface SitenameProps {
  textWidth: number;
}

const backgroundColor = "#5c7b65";
const strokeColor = "#ffffff";

const sitenameCss = css({
  gridArea: "sitename",

  "& h1": {
    lineHeight: 0.9,
    fontWeight: 900,
  },

  "& .header-a": {
    backgroundColor: backgroundColor,
    borderColor: strokeColor,
    stroke: strokeColor,
    fill: backgroundColor,
    padding: 0,
    overflow: "hidden",
    width: "100%",

    "&:hover, &:focus": {
      borderColor: backgroundColor,
      stroke: "none",
      backgroundColor: strokeColor,
      fill: backgroundColor,
    },

    ".MuiTouchRipple-child": {
      backgroundColor: backgroundColor,
    },
  },
});

const Sitename = ({ textWidth }: SitenameProps) => {
  const svgWidth = textWidth < 10 ? textWidth : textWidth - 10;

  return (
    <div className="sitename" css={sitenameCss}>
      <Link href="/" passHref>
        <Button className="header-a">
          <Typography variant="h1">
            <svg height={90} width={svgWidth} style={{ overflow: "hidden" }}>
              <text
                x="0"
                y="87"
                strokeDasharray="3,4"
                textLength={svgWidth}
                lengthAdjust="spacingAndGlyphs"
              >
                lukescanlan.com
              </text>
            </svg>
          </Typography>
        </Button>
      </Link>
    </div>
  );
};

export default Sitename;