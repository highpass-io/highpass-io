import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import get from "lodash/get";

import Header from "../components/header";

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

class BlogPostTemplate extends React.Component {
  render() {
    const { data, location } = this.props;
    const post = data.markdownRemark;
    const siteTitle = get(data, "site.siteMetadata.title");

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Header siteTitle={siteTitle} location={location} />

        <article>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
    );
  }
}

export default BlogPostTemplate;
