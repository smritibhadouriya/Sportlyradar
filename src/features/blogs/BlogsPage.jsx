import { useState } from 'react'
import SeoManager from '@/core/seo/SeoManager'
import { seoConfig } from '@/config/seo.config'
import { appConfig } from '@/config/app.config'
import BlogCard from '@/shared/components/BlogCard'
import { blogPosts } from '@/shared/constants/blogs.data'
import Button from '@/design-system/Button'

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(8)

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const visible = filtered.slice(0, visibleCount)

  return (
    <>
      <SeoManager
        title={seoConfig.pages.blogs.title}
        description={seoConfig.pages.blogs.description}
      />

      {/* Page header */}
      <div className="bg-[#00698c] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Blogs</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {appConfig.blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setVisibleCount(8) }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-[#0a3d4f] text-white border-[#0a3d4f]'
                  : 'bg-white dark:bg-[#1c2128] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-[#00698c]'
              }`}
            >
              {cat.emoji && <span>{cat.emoji}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blogs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {visible.length < filtered.length && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((c) => c + 8)}
            >
              Load More
            </Button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No blogs found in this category.
          </p>
        )}
      </div>
    </>
  )
}

export default BlogsPage
