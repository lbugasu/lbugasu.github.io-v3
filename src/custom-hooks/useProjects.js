import { useEffect, useState } from "react";
import { getProjects } from "../contentful";

const promise = getProjects();

export default function useProjects() {
  const [projects, setProjects] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((result) => {
      console.log(result);
      setProjects(result);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [projects, isLoading];
}
