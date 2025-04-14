import { Textarea } from "@/components/ui/textarea";

const DashboardTextarea = ({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <Textarea
      className="h-40 resize-none rounded-md border-none bg-stone-200/50 py-5 text-sm ring-offset-1 transition-all placeholder:text-sm placeholder:text-stone-400 focus-visible:ring-pink-600 md:py-6"
      {...props}
    />
  );
};

export default DashboardTextarea;
