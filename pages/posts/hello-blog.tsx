import React from "react";
import Image from "next/image";

import Layout from "./_layout";
import ContentHTML from "../../publishable/blog-engine/components/ContentHTML";

type TODO = any;

const postId = "hello-blog";

export async function getStaticProps() {
  const manifest = await import("../../publishable/blog-engine/manifest");
  const content = await manifest.getPostContent(postId, "index.md");
  return { props: { content } };
}

export default function Page(props: TODO) {
  const { content } = props;
  return (
    <Layout>
      <Image
        src="/content/hello-blog/banner.jpeg"
        alt="Open road"
        layout="responsive"
        width={500}
        height={300}
      />
      <ContentHTML htmlAst={content.ast} />
    </Layout>
  );
}
