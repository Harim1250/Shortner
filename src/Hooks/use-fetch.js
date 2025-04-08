// import { useState } from "react";

// const useFetch = (callback, ...defaultArgs) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false); // initialize correctly
//   const [error, setError] = useState(null);

//   const fn = async (...args) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await callback(...(defaultArgs.concat(args)));
//       console.log("Fetched response:", response); // ✅ should show in console
//       setData(response);
//       return response; // optional: return in case caller needs result
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, fn };
// };

// export default useFetch;

import { useState } from "react";
const useFetch = (callback, ...defaultArgs) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callback(...defaultArgs, ...args);
      console.log("Fetched response:", response);
      setData(response);
      return response;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
