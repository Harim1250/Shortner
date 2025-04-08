import supabase from "./supabase";
export async function getClicksForUrls(urlIds) {
  console.log("Fetching clicks for URL IDs:", urlIds);
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("getClicksForUrls error:", error);
    throw new Error("Unable to load the Clicks");
  }

  console.log("Fetched clicks:", data);
  return data;
}


// This function fetches clicks for a specific URL ID
// It can be used to get detailed stats for a single URL
export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}
