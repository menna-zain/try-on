import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';

import {
  ShoppingCart,
  DollarSign,
  CalendarClock,
 PackageCheck,
 LineChart,
  MessageSquare,
  Flame ,
  Truck,
} from "lucide-react";

export default function Stats() {
    const [states, setStates] = useState({});
    
  // Fetch Order
      useEffect(() => {
        getStats();
      }, []);
  
    async function getStats() {
      // setIsLoading(true);
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/analystics/dashboard",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // setIsLoading(false);
      console.log("stats data:", data);
      console.log("stats data.data:", data.data);
      setStates(data);
    }
    
    const stats = [
        { title: "Total Orders", icon: <PackageCheck />, value: states.totalOrders },
        { title: "Today Orders", icon: <Flame />, value: states.todayOrders },
        { title: "All Time Sales", icon: <DollarSign />, value: "£E" + states.allTimeSales },
        { title: "Orders Delivered", icon: <Truck />, value: states.ordersDelivered},
      ];
      
  return (
    <div >
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-2xl"
            >
              <div className="p-3 bg-gray-700 rounded-full text-cyan-400">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-400 font-body">{item.title}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
  )
}
