import { memo } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import { blogPosts } from '@/shared/constants/blogs.data'

const BlogsSection = memo(({ limit = 4 }) => {
  const posts = blogPosts.slice(0, limit)

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Blogs</h2>
        <Link
          to="/blogs"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#00698c] dark:hover:text-[#3387a3] transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} compact />
        ))}
      </div>
    </div>
  )
})

BlogsSection.displayName = 'BlogsSection'

export default BlogsSection
