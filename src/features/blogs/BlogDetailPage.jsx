import { useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import SeoManager from '@/core/seo/SeoManager';
import { blogPosts } from '@/shared/constants/blogs.data';

// Blog list path – adjust to your actual blog listing route
const BLOG_LIST_PATH = '/blogs';

// Tag pill (reused from NewsDetailPage) – plain JS, no types
const Tag = ({ label }) => (
  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[11px] font-medium px-2 py-0.5 rounded-full">
    #{label}
  </span>
);

// Related card component – plain JS, no types
const RelatedCard = ({ item, basePath }) => (
  <Link
    to={`${basePath}/${item.slug}`}
    className="flex gap-3 items-start group cursor-pointer"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-20 h-14 object-cover rounded flex-shrink-0 group-hover:opacity-80 transition-opacity"
      loading="lazy"
    />
    <div>
      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
        {item.title}
      </p>
      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 block">
        {item.date}
      </span>
    </div>
  </Link>
);

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();

  // Find the current post
  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  // Related articles: all posts except the current one, limited to 4
  const related = useMemo(
    () => (post ? blogPosts.filter((p) => p.id !== post.id).slice(0, 4) : []),
    [post]
  );

  // ── 404 handling ─────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          Blog post not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The article you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#00698c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#005a78] transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Format date (similar to NewsDetailPage)
  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <SeoManager
        title={`${post.title} | SportyRadar`}
        description={post.excerpt}
        type="article"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
          <Link to="/" className="text-gray-400 hover:text-[#00698c] transition-colors">
            Home
          </Link>
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <Link
            to={BLOG_LIST_PATH}
            className="text-gray-400 hover:text-[#00698c] transition-colors"
          >
            Blog
          </Link>
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300 line-clamp-1 max-w-xs">
            {post.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Main article ── */}
          <article className="flex-1 min-w-0">
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-[#00698c] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                {post.categoryLabel}
              </span>
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta (author & date) */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#00698c]/20 flex items-center justify-center text-[#00698c] text-xs font-bold">
                  {(post.author || 'A').charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-none">
                    {post.author}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-none mt-0.5">
                    SportyRadar
                  </p>
                </div>
              </div>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <time className="text-xs text-gray-400 dark:text-gray-500">
                {formattedDate}
              </time>
            </div>

            {/* Hero image */}
            <div className="relative rounded-lg overflow-hidden mb-6 h-64 sm:h-80 md:h-96">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Body / content paragraphs */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {post.content.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags (if available) */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            )}
          </article>

          {/* ── Sidebar: Related articles ── */}
          {related.length > 0 && (
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-20">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Related Articles
                </h2>
                <div className="space-y-4">
                  {related.map((item) => (
                    <RelatedCard key={item.id} item={item} basePath={BLOG_LIST_PATH} />
                  ))}
                </div>

                {/* Back to blog list */}
                <Link
                  to={BLOG_LIST_PATH}
                  className="mt-6 flex items-center gap-2 text-sm text-[#00698c] font-medium hover:underline"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2" strokeLinecap="round" d="M15 18l-6-6 6-6" />
                  </svg>
                  View all blog posts
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;