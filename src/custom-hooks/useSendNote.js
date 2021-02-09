import { useEffect, useState } from "react";

// API endpoint
let prod = "https://laudebugs.tamaduni.org";
let dev = "http://localhost:4000";
let endpoint = dev;

export default function useSendNote(note) {
  const [posted, setPosted] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const options = {
    method: "POST",
    body: JSON.stringify({
      name: note.name,
      email: note.email,
      subject: note.subject,
      note: note.note,
    }),
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(`${endpoint}/note`, options);
  useEffect(() => {
    promise.then((result) => {
      let response = result.json();
      response.then((what) => {
        setPosted(what.posted);
        setLoading(false);
      });
    });
  }, [note]);

  return [posted, isLoading];
}
