import { useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../Db/supabase"; // ✅ Make sure this points to your Supabase client setup
import { toast } from "react-toastify"; // ✅ Optional: for user-friendly messages

const RedirectLink = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const { data, error } = await supabase
          .from("short_links") // 🔁 Replace with your actual Supabase table name
          .select("original_url")
          .eq("short_id", id)   // 🔑 short_id is the identifier in your shortened link
          .single();            // Ensure you only get one result

        if (error || !data) {
          console.error("Redirection error:", error?.message || "No data found");
          toast.error("Invalid or expired link.");
          return;
        }

        // ✅ Perform redirection
        window.location.href = data.original_url;
      } catch (err) {
        console.error("Unexpected redirect error:", err);
        toast.error("Something went wrong!");
      }
    };

    if (id) fetchAndRedirect();
  }, [id]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Redirecting...</h2>
      <p>If you are not redirected automatically, please check the URL.</p>
    </div>
  );
};

export default RedirectLink;
