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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.title;
  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160);
  const url = `${seoConfig.siteUrl}/blog/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: `${post.month} ${post.date}, 2024`, // Adjust year if needed
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

import JsonLd from '@/components/seo/JsonLd';

export default async function BlogDetailsPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
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
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${params.slug}`,
    },
  };

  const allPosts = await getBlogPosts();
  const currentIndex = allPosts.findIndex(item => item.slug === params.slug);
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
        slug={params.slug}
      />
    </>
  );
}
