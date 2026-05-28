import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'DevPaul - Full-Stack Developer',
  description = 'Professional full-stack developer and UI/UX designer creating beautiful, functional, and user-friendly digital experiences. Specializing in React, Node.js, and modern web technologies.',
  keywords = 'Paul Realpe, DevPaul, Full-Stack Developer, UI/UX Designer, React, Node.js, JavaScript, TypeScript, Web Development, Mobile Development',
  author = 'Paul Realpe',
  image = '/og-image.jpg',
  url = 'https://co.devpaul.com'
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="DevPaul Portfolio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@devpaul" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#1E1E1E" />
      <meta name="msapplication-TileColor" content="#1E1E1E" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
}
