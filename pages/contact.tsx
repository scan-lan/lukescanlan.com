/** @jsxImportSource @emotion/react */

import ContactContainer from "../components/ContactContainer";
import ContactPage from "../types/ContactPage";
import { Email } from "react-obfuscate-email";
import { GetStaticProps } from "next/types";
import Image from "next/image";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import NavPage from "../types/NavPage";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { getFromAPI } from "../lib/api";
import { useRouter } from "next/router";

interface ContactProps {
  navPages: NavPage[] | null;
  contactPage: ContactPage | null;
}

const containerStyles = (theme: Theme) =>
  css({
    ".text-two p a": {
      color: theme.palette.primary.main,
      textDecoration: `2px ${theme.palette.primary.light} underline`,

      ":hover, :focus": {
        textDecorationColor: theme.palette.primary.dark,
      },
    },
  });

const Contact = ({ navPages, contactPage }: ContactProps) => {
  const router = useRouter();

  if (router.isFallback || contactPage === null) {
    return (
      <Layout navPages={navPages}>
        <ContactContainer additionalCss={containerStyles}>
          <div className="blurb text-one">
            <Typography>
              I&apos;m payin 5 quid a month for this email, so make it worth my
              while.
            </Typography>
          </div>
          <div className="email text-two">
            <Typography>
              Click <Email email="luke@lukescanlan.com">here</Email> for my
              email
            </Typography>
          </div>
          <div className="image">
            <div
              css={{
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                src="/contactPage.jpg"
                alt="Luke in repose at a bridge over white water"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </ContactContainer>
      </Layout>
    );
  }
  const image = contactPage?.attributes.contactImage.data || null;

  return (
    <Layout navPages={navPages}>
      <ContactContainer additionalCss={containerStyles}>
        <div className="text-one">
          <Markdown>{contactPage.attributes.blurb}</Markdown>
        </div>
        <div className="text-two">
          <Typography>
            Click <Email email="luke@lukescanlan.com">here</Email> for my email
          </Typography>
        </div>
        <div className="image">
          <div
            css={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <Image
              alt=""
              src={image.attributes.formats.xlarge?.url || image.attributes.url}
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </ContactContainer>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  const contactPage = await getFromAPI<{ data: ContactPage }>("/contact");

  return {
    props: {
      navPages: navPages?.data || null,
      contactPage: contactPage?.data || null,
    },
    revalidate: 1,
  };
};

export default Contact;
