/** @jsxImportSource @emotion/react */

import { GetStaticPaths, GetStaticProps } from "next";
import { Theme, css } from "@emotion/react";

import ApiArticle from "../../types/Article";
import ArticleImage from "../../components/ArticleImage";
import type { Components } from "react-markdown";
import Layout from "../../components/Layout";
import Link from "@mui/material/Link";
import NavPage from "../../types/NavPage";
import ReactMarkdown from "react-markdown";
import SEO from "../../components/SEO";
import StrapiMeta from "../../types/StrapiMeta";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Typography from "@mui/material/Typography";
import { a11yDark as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getFromAPI } from "../../lib/api";
import { getMedia } from "../../lib/getMedia";
import remarkGfm from "remark-gfm";
import { stringify } from "qs";

interface ArticleProps {
  article: ApiArticle;
  navPages: NavPage[];
}

const mainContent = "& p, & ul, & ol, & img";

const contentStyles = (theme: Theme) =>
  css({
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",

    "& a": {
      textDecorationThickness: ".16rem",
      "&:focus": {
        textDecorationColor: theme.palette.secondary.dark,
      },
    },

    "& p + p": {
      paddingTop: "1rem",
    },

    "& pre": {
      width: "100%",
      overflow: "scroll",
    },

    "& code": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },

    "& *": {
      gridColumn: "3 / span 8",
    },

    [mainContent]: {
      width: "100%",
      maxWidth: "55ch",
      justifySelf: "center",
    },

    [theme.breakpoints.down("lg")]: {
      "& *": {
        gridColumn: "2 / span 10",
      },

      [mainContent]: {
        fontSize: "1.35rem",
      },
    },

    [theme.breakpoints.down("md")]: {
      "& *": {
        gridColumn: "1 / span 12",
      },

      [mainContent]: {
        gridColumn: "2 / span 10",
        fontSize: "1.2rem",
      },
    },
  });

const componentMapping: Components = {
  h1: ({ node, ...props }) => <Typography variant="h2" {...props} />,
  h2: ({ node, ...props }) => <Typography variant="h3" {...props} />,
  h3: ({ node, ...props }) => <Typography variant="h4" {...props} />,
  h4: ({ node, ...props }) => <Typography variant="h5" {...props} />,
  h5: ({ node, ...props }) => <Typography variant="h6" {...props} />,
  h6: ({ node, ...props }) => <Typography variant="h6" {...props} />,
  p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
  a: ({ node, ...props }) => <Link color="primary.main" {...props} />,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // img: ({node, src, ...props}) => <Image src={src} width="100%" {...props} />,
};

const Article = ({ article, navPages }: ArticleProps) => {
  const image = getMedia(article.attributes.cover.data, "xl");

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.cover,
    article: true,
  };

  return (
    <Layout navPages={navPages}>
      <SEO seo={seo} />
      <ArticleImage
        image={image}
        title={article.attributes.title}
        altText={article.attributes.cover.data.attributes.alternativeText}
      />
      <main
        css={(theme) =>
          css({ padding: `${theme.spacing(3)} ${theme.spacing(1)}` })
        }
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={componentMapping}
          css={contentStyles}
        >
          {article.attributes.content}
        </ReactMarkdown>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles: { data: ApiArticle[] } = await getFromAPI("/articles");

  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleQueryParams = stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
    populate: ["writer", "writer.picture", "cover", "category"],
  });

  const articles: { data: ApiArticle[]; meta: StrapiMeta } = await getFromAPI(
    "/articles",
    articleQueryParams
  );

  const navPages = await getFromAPI("/nav-pages");

  return {
    props: { article: articles.data[0], navPages: navPages.data },
    revalidate: 1,
  };
};

export default Article;
