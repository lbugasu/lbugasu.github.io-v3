import { useEffect, useState } from "react";

import { getSingleExperiment } from "../contentful";

export default function useSingleExperiment(slug) {
  const promise = getSingleExperiment(slug);

  const [experiment, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((result) => {
      setPost(result[0].fields);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return [experiment, isLoading];
}
