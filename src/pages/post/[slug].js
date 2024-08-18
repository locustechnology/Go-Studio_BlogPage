import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import md from 'markdown-it';

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }));

    console.log('Generated paths:', paths); // Log paths

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const filePath = path.join('posts', `${slug}.md`);
    console.log('Attempting to read file at:', filePath); // Log file path

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath); // Log missing file
        return {
            notFound: true,
        };
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    console.log('Extracted frontmatter:', frontmatter); // Log frontmatter

    return {
        props: {
            frontmatter,
            content,
        },
    };
}

export default function PostPage({ frontmatter, content }) {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
            <p className="text-gray-600 mb-4">{frontmatter.description}</p>
            <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        </div>
    );
}
