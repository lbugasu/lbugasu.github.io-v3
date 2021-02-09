import { useEffect, useState } from "react";

// API endpoint
let prod = "https://laudebugs.tamaduni.org";
let dev = "http://localhost:4000";
let endpoint = dev;

export default function useSignUp(user) {
  const [saved, setStatus] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const options = {
    method: "POST",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    }),
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(`${endpoint}/signup`, options);
  useEffect(() => {
    promise.then((result) => {
      let response = result.json();
      response.then((what) => {
        setStatus(what.saved);
        setLoading(false);
      });
    });
  }, [user, promise]);

  return [saved, isLoading];
}
