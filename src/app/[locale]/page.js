'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
export default function Home() {
  const t = useTranslations('IndexPage'); // Assuming 'IndexPage' is the key for your translations
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.slug} className="border rounded-lg shadow-lg overflow-hidden bg-white">
            <Link href={`/post/${post.slug}`}>
              <img
                src={`/${post.socialImage}`}
                alt={post.title}
                className="w-full h-40 object-cover cursor-pointer"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{post.description}</p>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>{t('author')}:</strong> {post.author}
                </p>
                <p>
                  <strong>{t('date')}:</strong> {post.date}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <strong>{t('tags')}:</strong> {post.tags.join(', ')}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>{t('noPostsFound')}</p>
      )}
    </div>
  );
}
