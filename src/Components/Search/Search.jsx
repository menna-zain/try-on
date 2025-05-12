import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";



export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  

  // تأخير البحث عشان الأداء (Debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        axios
          .get(`https://api.tryon-store.xyz/api/v1/products?keyword=${query}`)
          .then((res) =>{ setResults(res.data.data),console.log("results:", res),console.log("product", res.data.data);});
          
      } else {
        setResults([]); 
      }
    }, 500); // نصف ثانية
    console.log("Query:", query);
    // console.log("Final URL:", finalUrl);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (

        <div className="relative mb-2">
          <Input
           startContent={<SearchIcon size={18} />}
            type="search"
            placeholder="search..."
            classNames={{
                base: "max-w-full sm:max-w-[10rem] h-8",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-400/20 font-heading",
              }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="absolute overflow-y-auto bg-white border rounded shadow-lg max-h-60 top-12 w-80 right-1">
              {results.map((item) => (
                 <Link to={"/product/" + item._id} key={item._id}  onClick={() => {
                    setQuery("");      // تصفير البحث
                    setResults([]);    // إخفاء القائمة
                  }}>
                <li  className="px-4 py-2 border-b cursor-pointer hover:bg-gray-100">
                  <p>{item.name}</p>
                </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      );
}
