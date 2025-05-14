
import { BlogPost } from "@/types/blog";

const STORAGE_KEY = "blog_posts";

// Mock data - initial seed posts
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    content: `
      <h2>The Web Platform Continues to Evolve</h2>
      <p>The web platform has come a long way since the early days of HTML and CSS. Today, we have powerful APIs, frameworks, and tools that make building rich, interactive web applications easier than ever.</p>
      <p>Technologies like WebAssembly, PWAs, and Edge Computing are pushing the boundaries of what's possible on the web.</p>
      <h2>AI-Assisted Development</h2>
      <p>AI tools are transforming how we write code, debug applications, and design user interfaces. From code completion to automated testing, these tools are making developers more productive and helping them create better software.</p>
      <h2>The Rise of Headless Architecture</h2>
      <p>Headless architecture separates the frontend from the backend, allowing developers to build more flexible and scalable applications. This approach is becoming increasingly popular as organizations look to deliver content across multiple channels and devices.</p>
      <p>As we move forward, the lines between traditional web apps, mobile apps, and desktop applications will continue to blur, creating new opportunities and challenges for developers.</p>
    `,
    author: "Nick Bohmer",
    date: "2023-05-15",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    tags: ["Web Development", "Future Tech", "Trends"]
  },
  {
    id: "2",
    title: "Designing for Accessibility",
    excerpt: "Why accessibility should be a priority in your design process and how to implement it effectively.",
    content: `
      <h2>Accessibility is for Everyone</h2>
      <p>When we design with accessibility in mind, we're not just designing for people with disabilities — we're designing for everyone. Accessible design improves usability for all users, regardless of their abilities or circumstances.</p>
      <p>Simple changes like proper color contrast, clear navigation, and semantic HTML can make a huge difference in how people experience your website.</p>
      <h2>Key Principles of Accessible Design</h2>
      <ul>
        <li>Perceivable: Information must be presentable to users in ways they can perceive.</li>
        <li>Operable: User interface components must be operable by all users.</li>
        <li>Understandable: Information and operation must be understandable.</li>
        <li>Robust: Content must be robust enough to be interpreted by a wide variety of user agents.</li>
      </ul>
      <h2>Testing for Accessibility</h2>
      <p>Regular testing is essential to ensure your website remains accessible. Use a combination of automated tools, manual testing, and user testing to identify and address accessibility issues.</p>
      <p>Remember, accessibility is not a one-time effort but an ongoing process that should be integrated into your design and development workflow.</p>
    `,
    author: "Nick Bohmer",
    date: "2023-06-20",
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
    tags: ["Accessibility", "UI/UX", "Design"]
  },
  {
    id: "3",
    title: "Performance Optimization Techniques",
    excerpt: "Practical tips to improve the performance of your web applications.",
    content: `
      <h2>Why Performance Matters</h2>
      <p>In today's fast-paced digital world, users expect websites and applications to load quickly and respond immediately to their interactions. Even small delays can lead to frustration and abandonment.</p>
      <p>Studies have shown that a 1-second delay in page load time can result in a 7% reduction in conversions. Performance is not just a technical consideration — it directly impacts user satisfaction and business outcomes.</p>
      <h2>Key Performance Metrics</h2>
      <p>To improve performance, it's important to measure and monitor key metrics like:</p>
      <ul>
        <li>First Contentful Paint (FCP)</li>
        <li>Largest Contentful Paint (LCP)</li>
        <li>First Input Delay (FID)</li>
        <li>Cumulative Layout Shift (CLS)</li>
        <li>Time to Interactive (TTI)</li>
      </ul>
      <h2>Optimization Techniques</h2>
      <h3>1. Minimize HTTP Requests</h3>
      <p>Each request to the server takes time, so reducing the number of requests can significantly improve load times. Combine and minify CSS and JavaScript files, use CSS sprites, and implement lazy loading for images and other resources.</p>
      <h3>2. Optimize Images</h3>
      <p>Use modern formats like WebP, compress images appropriately, and serve responsive images based on the user's device.</p>
      <h3>3. Leverage Caching</h3>
      <p>Implement browser caching, use CDNs, and consider service workers for offline capabilities.</p>
      <h3>4. Code Splitting</h3>
      <p>Only load the JavaScript needed for the current page or view, using techniques like dynamic imports and route-based code splitting.</p>
      <p>By consistently applying these techniques, you can create faster, more responsive web experiences that users will love.</p>
    `,
    author: "Nick Bohmer",
    date: "2023-07-10",
    coverImage: "https://images.unsplash.com/photo-1558126319-4ab2393c44c6?q=80&w=1974&auto=format&fit=crop",
    tags: ["Performance", "Optimization", "Web Development"]
  }
];

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  const storedPosts = localStorage.getItem(STORAGE_KEY);
  if (!storedPosts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPosts));
  }
};

// Get all posts
const getPosts = (): BlogPost[] => {
  initializeStorage();
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

// Get a specific post by ID
const getPostById = (id: string): BlogPost | undefined => {
  const posts = getPosts();
  return posts.find(post => post.id === id);
};

// Create a new post
const createPost = (post: Omit<BlogPost, "id" | "date">): BlogPost => {
  const posts = getPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  posts.unshift(newPost); // Add to the beginning of the array
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

// Update an existing post
const updatePost = (id: string, updatedPost: Partial<BlogPost>): BlogPost | null => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updatedPost };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return posts[index];
};

// Delete a post
const deletePost = (id: string): boolean => {
  const posts = getPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
  return true;
};

export const blogService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
