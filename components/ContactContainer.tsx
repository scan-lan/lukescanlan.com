/** @jsxImportSource @emotion/react */

import { ReactChild } from "react"
import { Theme } from "@mui/material/styles"
import { css } from "@emotion/react"

const mainStyles = (theme: Theme) =>
  css({
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gridTemplateRows: "3fr 2fr",

    ".image": {
      gridRow: "1 / span 2",
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1),
      borderRight: "2px black dashed",
    },

    ".text-one": {
      justifySelf: "right",
      alignSelf: "center",
      padding: theme.spacing(1),
      p: {
        maxWidth: "35ch",
      },
      "h1, h2, h3, h4, h5, h6": {
        textAlign: "right",
      },
    },

    ".text-two": {
      height: "100%",
      display: "grid",
      alignContent: "center",
      textAlign: "center",
      padding: theme.spacing(0, 1),
      marginRight: theme.spacing(1),
      borderTop: "2px black dashed",
    },

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "3fr 4fr 3fr",

      ".text-one": {
        gridRow: 1,
      },

      ".image": {
        gridRow: 2,
        borderRight: "none",
        borderTop: "2px black dashed",
        padding: theme.spacing(1),
        margin: 0,
      },

      ".text-two": {
        gridRow: 3,
        margin: 0,
      },
    },
  })

interface ContactContainerProps {
  children: ReactChild | ReactChild[]
  className?: string
}

const ContactContainer = ({ children, className }: ContactContainerProps) => (
  <main className={className || ""} css={[mainStyles]}>
    {children}
  </main>
)

export default ContactContainer
