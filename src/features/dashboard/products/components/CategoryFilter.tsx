import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY } from "@/constants/dashboard";
import { RiColorFilterFill } from "react-icons/ri";
import { useFiltereProductStore } from "../store/use-filtering";

const CategoryFilter = () => {
  const {
    selectedCategory,
    selectedSubCategory,
    setSelectedCategory,
    setSelectedSubCategory,
  } = useFiltereProductStore();

  const selectedCategoryData = ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY.find(
    (item) => item.category === selectedCategory,
  );

  return (
    <div>
      <Popover>
        <PopoverTrigger className="flex items-center gap-2 rounded-md border p-2 px-4 text-sm font-semibold text-slate-700 shadow-md">
          <RiColorFilterFill className="size-4" />
          Filter <span className="hidden md:block"> & Sorting</span>
        </PopoverTrigger>
        <PopoverContent align="end" side="bottom" className="space-y-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY.map((item) => (
                <SelectItem key={item.category} value={item.category}>
                  {item.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            disabled={!selectedCategory}
            value={selectedSubCategory}
            onValueChange={setSelectedSubCategory}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Sub-Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {selectedCategoryData?.subcategories?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoryFilter;
