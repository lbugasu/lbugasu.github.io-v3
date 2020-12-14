import { useEffect, useState } from "react";

import { getSectionedPosts } from "../contentful";

export default function useTaggedPost(tag) {
  const promise = getSectionedPosts(tag);

  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((result) => {
      const sortedPosts = result.sort(function (a, b) {
        return new Date(b.fields.date) - new Date(a.fields.date);
      });
      setPosts(sortedPosts);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  return [posts, isLoading];
}
