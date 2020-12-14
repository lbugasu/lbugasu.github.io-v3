import { useEffect, useState } from "react";

import { getTaggedPost } from "../contentful";

export default function useTaggedPost(tag) {
  const promise = getTaggedPost(tag);

  const [posts, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((result) => {
      setPost(result[0].fields);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  return [posts, isLoading];
}
