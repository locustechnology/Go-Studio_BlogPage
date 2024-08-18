import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);  // Extract frontmatter

    // Log all extracted data to the console
    console.log('Extracted data:', data);

    return {
      slug: filename.replace('.md', ''),
      title: data.title || 'Untitled Post',
      description: data.description || 'No description available',
      author: data.author || 'Unknown Author',
      socialImage: data.socialImage || '/default-image.png',
      date: data.date || 'No date provided',
      tags: data.tags || [],
     
    };
  });

  res.status(200).json(posts);
}
