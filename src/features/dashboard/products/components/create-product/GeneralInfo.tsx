import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import DashboardInput from "../../../shared/DashboardInput";
import DashboardTextarea from "../../../shared/DashboardTextarea";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import SubSecWrapper from "../shared/SubSecWrapper";
import CustomFormLabel from "../shared/CustomFormLabel";
import BulletinDescription from "./BulletinDescription";
import { AddProductFormProps } from "../../types";
import { PRODUCT_QUALIFICATIONS } from "@/constants/dashboard";

const GeneralInfo = ({ form }: AddProductFormProps) => {
  return (
    <SubSecWrapper title="General Information">
      <FormField
        control={form.control}
        name="qualification"
        render={({ field }) => (
          <FormItem>
            <CustomFormLabel
              title="Qualification"
              des="Pick a some qualification for this product."
            />

            <FormControl>
              <MultiSelector
                values={field.value}
                onValuesChange={field.onChange}
                loop
                className="z-50 ring-0"
              >
                <MultiSelectorTrigger className="z-50 my-0 w-full rounded-md bg-stone-200/50 py-[12px] text-sm">
                  <MultiSelectorInput
                    className="z-50 w-full"
                    placeholder="Select qualifications"
                  />
                </MultiSelectorTrigger>
                <MultiSelectorContent className="z-[999] m-0">
                  <MultiSelectorList className="overflow-ellipsis">
                    {PRODUCT_QUALIFICATIONS.map((item) => (
                      <MultiSelectorItem key={item} value={item}>
                        {item}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <CustomFormLabel title="Product Name" des="Name must be unique" />
            <FormControl>
              <DashboardInput
                placeholder="Black cotton shirt for men"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <CustomFormLabel
              title="Product Descriptions"
              des="Give a proper description with bulletin point"
            />
            <FormControl>
              <DashboardTextarea
                placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, accusamus porro eius totam, asperiores facere molestias qui earum sequi optio nam iusto vero nisi. Illo quis magni voluptas expedita. Voluptatum!"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <BulletinDescription form={form} />
    </SubSecWrapper>
  );
};

export default GeneralInfo;
