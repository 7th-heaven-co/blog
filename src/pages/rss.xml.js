// file: ./src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const announcements = (await getCollection('announcements')) || [];
  const author = (await getCollection('author')) || [];
  const community = (await getCollection('community')) || [];
  const events = (await getCollection('events')) || [];
  const heaven = (await getCollection('heaven')) || [];
  const releases = (await getCollection('releases')) || [];

  const allPosts = [
    ...announcements,
    ...author,
    ...community,
    ...events,
    ...heaven,
    ...releases,
  ];

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: allPosts.map((post) => ({
      ...post.data,
      link: `/blog/${post.data.category}/${post.id}/`,
    })),
  });
}
