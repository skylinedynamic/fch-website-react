import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getBlogPostBySlug,
  getBlogPosts,
  getBlogCategories,
  getBlogTags
} from '@/lib/api/cmsService';
import BlogDetailsClient from './BlogDetailsClient';
import { seoConfig } from '@/config/seo';

interface Props {
  params: { slug: string };
}

import { getBlogPostMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return getBlogPostMetadata(slug, post);
}

import JsonLd from '@/components/seo/JsonLd';

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta_title,
    image: `${seoConfig.siteUrl}${post.image}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/images/favicon.png`,
      },
    },
    datePublished: `${post.month} ${post.date}, 2024`, // Adjust as needed
    description: post.meta_description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${slug}`,
    },
  };

  const allPosts = await getBlogPosts({ is_featured: 1 });
  const currentIndex = allPosts.findIndex(item => item.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 && currentIndex !== -1 ? allPosts[currentIndex + 1] : null;

  const categories = await getBlogCategories();
  const tags = await getBlogTags();

  return (
    <>
      <JsonLd data={blogSchema} />
      <BlogDetailsClient
        initialPost={post}
        initialCategories={categories}
        initialTags={tags}
        initialPrevPost={prevPost}
        initialNextPost={nextPost}
        latestPosts={allPosts.slice(0, 3)}
        slug={slug}
      />
    </>
  );
}
