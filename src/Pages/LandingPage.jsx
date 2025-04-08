import { Input } from "@/components/ui/input";
import { LinkIcon, QrCodeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Autoplay} from "swiper/modules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "../Data/faq.json";
import banner from "../assets/banner.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [LongUrl , setLongUrl] = useState("");
  const navigate = useNavigate();

const handlesorten =(e) => {
  e.preventDefault();
  if(LongUrl) navigate(`auth?createNew=${LongUrl}`);
};


  // Rotating placeholder text
  const placeholders = [
    "Paste your lengthy tracking or analytics link here...",
    "Enter a long and complex database query URL...",
    "Shorten your extensive API request link...",
    "Convert your cloud storage link into a compact format...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Carousel content
  const slides = [
    {
      image: "https://images.pexels.com/photos/31346411/pexels-photo-31346411/free-photo-of-mountain-goat-standing-on-rocky-cliff-in-alps.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: "Shorten Long URLs Instantly – Convert long, complex links into short and shareable URLs.",
    },
    {
      image: "https://images.pexels.com/photos/15499499/pexels-photo-15499499/free-photo-of-fake-pack-of-goats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: "Track Your Link Performance – Get real-time analytics on link clicks.",
    },
    {
      image: "https://images.pexels.com/photos/20397914/pexels-photo-20397914/free-photo-of-supermoon-and-mont-blanc-if-you-like-my-work-consider-supporting-me-at-https-www-patreon-com-marekpiwnicki.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: "Generate QR Codes Easily – Create a QR code for your shortened URL instantly.",
    },
    {
      image: "https://images.pexels.com/photos/19273402/pexels-photo-19273402/free-photo-of-broken-lines.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: "Custom Branded Links – Personalize short links with a custom domain.",
    },
    {
      image: "https://images.pexels.com/photos/19273402/pexels-photo-19273402/free-photo-of-broken-lines.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: "Secure & Private – Your links are encrypted and safe.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <h1 className="ml-10 mr-10 mt-10 text-7xl text-center">
        "Make every character count – shorten your links now!"
      </h1>
      <p className="ml-10 mr-10 text-3xl text-amber-700 text-center pt-5 pb-7">
        Use our URL shortener, QR Codes, and landing pages to engage your audience and
        connect them to the right information. Track and manage everything in one place.
      </p>

      {/* Functional Section */}
      <div className="functionalsection flex justify-center items-center mt-10 mb-10 space-x-20">
        <Button className="flex items-center gap-x-2 rounded-md bg-white p-7 text-2xl  text-black border black -gray-300 cursor-pointer hover:bg-gray-100 transition">
          <LinkIcon className="w-17 h-50" /> Short Link
        </Button>
        <Button className="flex items-center gap-x-2 text-2xl bg-white p-7 rounded-md text-black border border-gray-300 cursor-pointer hover:bg-gray-100 transition">
          <QrCodeIcon className="" /> Generate QR
        </Button>
      </div>

      {/* Input Section */}
      <div className="urlinput flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Shorten Your Long Link</h2>
        <div className="flex items-center space-x-5">
          <form onSubmit={handlesorten} className="flex items-center space-x-4">
          <input
            type="url"
            value={LongUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-12 w-150 px-4 border border-black rounded-md"
            placeholder={placeholders[placeholderIndex]}
          />
          <button className="bg-green-400 text-white rounded-md px-6 py-2 text-2xl hover:bg-green-500 transition">
            Shorten
          </button>
          </form>
        </div>
      </div>


      {/* Carousel Section */}
      <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000, disableOnInteraction: false }} // 30 seconds auto-slide
      loop={true}
      className="w-full p-5 max-w-6xl mx-auto mt-10 mb-20"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="flex flex-col items-center text-center p-4 rounded-lg shadow-md">
          <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-100 object-cover rounded-lg" />
          <p className="text-xl font-bold mt-4 mb-10">{slide.text}</p>
        </SwiperSlide>
      ))}
    </Swiper>

{/* banner  */}
<img src={banner}alt="bannerimages" className="mt-10 mb-10 rounded-xl" />

    {/* FAQ section */}
    <Accordion type="multiple" className="pl-4 mt-5 mb-5 rounded-xl ">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
};

export default LandingPage;
