import { wpClient } from '../services/wp-graphql';

export async function GET({ site }: { site: URL }) {
  const siteUrl = site?.origin || 'https://emagrecer.xx.kg';
  let items = '';
  try {
    const result = await wpClient.getPosts(50);
    const posts = result.nodes.sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    items = posts
      .map(
        (post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/artigo/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/artigo/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.author?.node?.name ? `<dc:creator><![CDATA[${post.author.node.name}]]></dc:creator>` : ''}
      ${post.categories?.nodes?.map((c: any) => `<category><![CDATA[${c.name}]]></category>`).join('\n      ') || ''}
      ${post.featuredImage?.node?.sourceUrl ? `<enclosure url="${post.featuredImage.node.sourceUrl}" type="image/jpeg" />` : ''}
    </item>`
      )
      .join('\n');
  } catch (e) {
    console.warn('Failed to fetch posts for RSS:', e);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Emagrecer</title>
    <description>Sua jornada saudável para emagrecimento, nutrição, treinos e bem-estar</description>
    <link>${siteUrl}</link>
    <language>pt-BR</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>Emagrecer</title>
      <link>${siteUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
