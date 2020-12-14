import { useEffect, useState } from "react";

import { getSinglePost } from "../contentful";

export default function useSinglePost(slug) {
  const promise = getSinglePost(slug);

  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((result) => {
      setPost(result[0].fields);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return [post, isLoading];
}
