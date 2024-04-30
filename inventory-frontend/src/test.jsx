import { useState } from 'react'
import { BsArrowLeftShort, BsBox } from "react-icons/bs"
import { AiFillEnvironment } from "react-icons/ai"
//import './App.css'

function App() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ?
        "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl 
        rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} 
        onClick = {() => setOpen (!open)}
        />
        <div className="inline-flex">
          <BsBox className="bg-amber-300 text-dark-purple text-4xl 
          rounded cursor-pointer block float-left mr-2"/>
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Inventary</h1>
        </div>
      </div>

      <div className="p-7">
        <h1 className="text-2xl font-semibold">Home Page</h1>
        </div>
    </div>
  )
}

export default App
 
import { useState } from "react";
import { BsArrowLeftShort, BsBox } from "react-icons/bs"
import { FaChartPie, FaInbox, FaUser } from 'react-icons/fa';
const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", icon: <FaChartPie /> },
    { title: "Inbox", icon: <FaInbox /> },
    { title: "Accounts", icon: <FaUser />},
    { title: "Schedule ", icon: <FaUser /> },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
          <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl 
        rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} 
        onClick = {() => setOpen (!open)}
        />
        <div className="inline-flex">
          <BsBox className={`bg-amber-300 text-dark-purple text-4xl 
          rounded cursor-pointer block float-left mr-2 duration-500 ${!open&& "rotate-[360deg]"}`}/>
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Inventary</h1>
        </div>
        <ul className="pt-2">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
          {Menu.icon}
           <span>{Menu.title}</span>  
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};
export default App;