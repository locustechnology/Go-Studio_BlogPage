'use client'
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function Dropdown() {
    // const [isPending,startTransition] = useTransition()
    const router = useRouter(); 
    const localActive = useLocale(); 

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>{
       const nextLocale = e.target.value;
    //    startTransition(()=>{
         router.replace(`/${nextLocale}`);
       
    }
    return (
      <label className="block text-white-700 text-sm font-bold mb-2">
        <p className="mb-2">Change Language</p>
        <select
        defaultValue={localActive}
        onChange={onSelectChange}
       
          name="language"
          id="language"
          className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="gu">Gujarti</option>
        </select>
      </label>
    );
  }
  