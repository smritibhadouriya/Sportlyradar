import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BlogCard = memo(({ post, compact = false }) => {
  const navigate =useNavigate();

  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer"
    onClick={() => navigate(`/blogs/${post.slug}`)}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover ${compact ? 'h-36' : 'h-44'}`}
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          {post.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className={`font-bold text-gray-900 dark:text-white leading-snug mb-1 ${compact ? 'text-sm' : 'text-base'}`}>
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            By {post.author} • {post.date}
          </span>
          <Link
            to={`/blogs/${post.slug}`}
            className="text-xs font-semibold text-gray-800 dark:text-white hover:text-[#00698c] dark:hover:text-[#3387a3] transition-colors flex items-center gap-0.5"
          >
            Read More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2.5" strokeLinecap="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogCard
