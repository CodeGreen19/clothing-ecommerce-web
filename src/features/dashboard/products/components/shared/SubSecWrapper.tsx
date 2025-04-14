import { ChildrenProps } from "@/data/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SubSecType = ChildrenProps & {
  title: string;
};
const SubSecWrapper = ({ children, title }: SubSecType) => {
  return (
    <Card className="-z-10 rounded-none shadow-none drop-shadow-none md:rounded-md md:drop-shadow-md">
      <CardHeader className="p-3 md:p-5">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="-z-10 space-y-4 p-3 md:space-y-5 md:p-5">
        {children}
      </CardContent>
    </Card>
  );
};

export default SubSecWrapper;
