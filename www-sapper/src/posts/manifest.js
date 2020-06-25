const fetch = require("isomorphic-fetch");

const POST_LIST_QUERY = `{
  allPost {
    title
    slug {
      current
    }
  }
}`;

function parsePostsList(data) {
  return data.data.allPost.map(p => {
    return {
      title: p.title,
      slug: p.slug.current
    };
  });
}

export async function getPostsList() {
  const url = "https://5j4fmtcb.api.sanity.io/v1/graphql/production/default";
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: POST_LIST_QUERY })
  };
  const resp = await fetch(url, params);
  const data = await resp.json();
  return parsePostsList(data);
}

const POST_QUERY = `{
  allPost(where: { slug: { current: { eq: "{POST_SLUG}" } } }) {
    title
    slug {
      current
    }
    bodyRaw
  }
}`;

function parsePost(data) {
  const post = data.data.allPost[0];
  if (!post) {
    return null;
  }

  return {
    title: post.title,
    slug: post.slug.current,
    bodyRaw: post.bodyRaw
  };
}

export async function getPost(slug) {
  const url = "https://5j4fmtcb.api.sanity.io/v1/graphql/production/default";
  const query = POST_QUERY.replace("{POST_SLUG}", slug);
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  const resp = await fetch(url, params);
  const data = await resp.json();
  return parsePost(data);
}