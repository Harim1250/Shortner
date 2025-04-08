import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

import { storeClicks, getLongUrl } from "../Db/ApiUrls";
import useFetch from "../Hooks/use-fetch";

const RedirectLink = () => {
  const { id } = useParams();

  // Fetch the long/original URL from Supabase using the short/custom ID
  const { loading, data, fn } = useFetch(getLongUrl, id);

  // Trigger storing click stats after data is loaded
  const {
    loading: loadingStats,
    fn: fnStats,
  } = useFetch(storeClicks, {
    id: data?.id,
    originalurl: data?.original_url, // ✅ Ensure the key matches exactly
  });

  // Fetch the original URL on component mount
  useEffect(() => {
    fn(); // Calls getLongUrl with the short/custom id
  }, []);

  // After data is loaded, store click stats and redirect
  useEffect(() => {
    if (!loading && data) {
      fnStats(); // This will call storeClicks and redirect the user
    }
  }, [loading]);

  // While loading data or storing clicks
  if (loading || loadingStats) {
    return (
      <div className="flex flex-col items-center mt-10">
        <BarLoader width={"100%"} color="#36d7b7" />
        <p className="mt-4 text-lg">Redirecting...</p>
      </div>
    );
  }

  // If no link was found for the given ID
  if (!data) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold text-lg">
        ❌ Link not found. Please check your URL.
      </div>
    );
  }

  return null;
};

export default RedirectLink;
 