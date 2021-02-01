import { useEffect, useState } from "react";
import { getAllPosts } from "../contentful";

const promise = getAllPosts();

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((allPosts) => {
      const posts = allPosts.sort(function (a, b) {
        return new Date(b.fields.date) - new Date(a.fields.date);
      });

      setPosts(posts);
      setLoading(false);
    });
  }, []);
  return [posts, isLoading];
}
