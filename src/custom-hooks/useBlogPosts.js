import { useEffect, useState } from "react";
import { getBlogPosts } from "../contentful";

const promise = getBlogPosts();

export default function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((blogPosts) => {
      const posts = blogPosts.sort(function (a, b) {
        return new Date(b.fields.date) - new Date(a.fields.date);
      });
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);
  return [blogPosts, isLoading];
}
