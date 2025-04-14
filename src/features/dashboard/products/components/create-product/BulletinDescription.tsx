"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardInput from "@/features/dashboard/shared/DashboardInput";
import DashboardTextarea from "@/features/dashboard/shared/DashboardTextarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { AddProductFormProps } from "../../types";

export default function BulletinDescription({ form }: AddProductFormProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  // form data
  const bulletins = form.watch("dseBulletin");

  const handleAdd = () => {
    if (title.trim() && text.trim()) {
      const data = form.getValues("dseBulletin");
      data.push({ title, text });
      form.setValue("dseBulletin", data);
      setTitle("");
      setText("");
    }
  };
  const removeBulletin = (index: number) => {
    const filteredData = form
      .getValues("dseBulletin")
      .filter((_, i) => i !== index);
    form.setValue("dseBulletin", filteredData);
  };

  return (
    <div className="w-full space-y-2">
      {/* Popover Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex gap-2" type="button" variant={"outline"}>
            <Plus className="h-4 w-4" />
            Add Bulletins
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-80 space-y-4 p-4">
          <DashboardInput
            placeholder="Bulletin Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DashboardTextarea
            placeholder="Bulletin Description"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className="w-full bg-pink-500 hover:bg-pink-600"
            onClick={handleAdd}
          >
            Add
          </Button>
        </PopoverContent>
      </Popover>

      {/* Display Bulletins */}
      <div className="grid gap-2 pl-1 text-sm">
        {bulletins.map((bulletin, index) => (
          <li
            key={index}
            className="relative flex items-center justify-between"
          >
            <div className="flex gap-2">
              <span className="mt-[6px] inline-block size-2 rounded-full bg-pink-500"></span>
              <div className="space-x-1">
                <span className="font-semibold">{bulletin.title}</span>
                <span className="">:</span>
                <span className="text-sm italic text-stone-500">
                  {bulletin.text}
                </span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                type="button"
                className="absolute right-0 top-0"
                onClick={() => removeBulletin(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
