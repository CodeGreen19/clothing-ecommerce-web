import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DELEVERY_OPTIONS,
  RETURN_OPTIONS,
  WARRANTY_OPTIONS,
} from "@/constants/dashboard";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import DashboardInput from "../../../shared/DashboardInput";
import { AddProductFormProps } from "../../types";
import SubSecWrapper from "../shared/SubSecWrapper";

const AdditionalInformations = ({ form }: AddProductFormProps) => {
  return (
    <SubSecWrapper title="Additional Info">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField
          control={form.control}
          name="insideDhakaDelevery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inside Dhaka Delevery</FormLabel>
              <FormControl>
                <DashboardInput
                  type="number"
                  placeholder="Enter original price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outsideDhakaDelevery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outside Dhaka Delevery</FormLabel>
              <FormControl>
                <DashboardInput
                  type="number"
                  placeholder="Enter given price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-2 *:rounded-md *:border *:bg-white *:p-2 *:shadow-md md:grid-cols-2">
        <FormField
          control={form.control}
          name="warranty"
          render={() => (
            <FormItem>
              <FormLabel>Warranty</FormLabel>
              <FormControl>
                <div className="space-y-2 text-sm">
                  {WARRANTY_OPTIONS.map((item) => (
                    <div
                      key={item}
                      onClick={() => form.setValue("warranty", item)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Check
                        className={cn(
                          "size-6 rounded-full p-1 text-pink-500",
                          form.getValues().warranty === item ? "" : "invisible",
                        )}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CODoption"
          render={() => (
            <FormItem>
              <FormLabel>Cash On Delevery</FormLabel>
              <FormControl>
                <div className="space-y-2 text-sm">
                  {DELEVERY_OPTIONS.map((item) => (
                    <div
                      key={item}
                      onClick={() => form.setValue("CODoption", item)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Check
                        className={cn(
                          "size-6 rounded-full p-1 text-pink-500",
                          form.getValues().CODoption === item
                            ? ""
                            : "invisible",
                        )}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnTime"
          render={() => (
            <FormItem>
              <FormLabel>Return Time</FormLabel>
              <FormControl>
                <div className="space-y-2 text-sm">
                  {RETURN_OPTIONS.map((item) => (
                    <div
                      key={item}
                      onClick={() => form.setValue("returnTime", item)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Check
                        className={cn(
                          "size-6 rounded-full p-1 text-pink-500",
                          form.getValues().returnTime === item
                            ? ""
                            : "invisible",
                        )}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="py-10 md:py-2"></div>
    </SubSecWrapper>
  );
};

export default AdditionalInformations;
