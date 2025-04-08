import { UAParser } from "ua-parser-js";
import supabase,{supabaseUrl} from "./supabase";

export const getUrls = async (user_id) => {
  console.log("API called with userId:", user_id); // ✅ this must show
  try {
    const { data, error } = await supabase
      .from("urls")        // ✅ make sure table name is correct
      .select("*")
      .eq("user_id", user_id); // ✅ make sure column name matches

    if (error) throw error;

    console.log("Fetched URLs:", data);
    return data;
  } catch (err) {
    console.error("Error fetching URLs:", err.message);
    return [];
  }
};


// for the api delete section
export async function deleteUrl(id) {

  const {data, error} = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete Url");
  }
  return data;
}


// for the creating the urls
export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;

  const {error: storageError} = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  
// if the url is not post than here will wer any error 
  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const {data, error} = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }
  return data;
}


// the long url api call 
export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .maybeSingle();

  if (error) {
    console.error("Error fetching short link:", error);
  }

  return data;
}

const parser = new UAParser();

export const storeClicks = async ({id , originalurl}) => {
    try {
      const res = parser.getResult();
      const device = res.type || "desktop";
      const response = await fetch("https://ipapi.co/json")
      const {city , country_name: country} = await response.json()

      await supabase.from("clicks").insert({
        
          url_id:id,
          device:device,
          city:city,
          country:country,
    });
    window.location.href = originalurl;

    } catch (error) {
      console.error("Error storing clicks:", error);
    }
}


// getUrl call api call to be made;
export async function getUrl({id, user_id}) {
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }
  return data;
}