import { ReactNode } from "react";

interface DashboardCardHeaderProps {
  title: string;
  sub_title?: string;
  children?: ReactNode;
}

const DashboardPageHeader = ({
  title,
  sub_title,
  children,
}: DashboardCardHeaderProps) => {
  return (
    <div className="flex items-center justify-between pb-6 lg:pb-8">
      <div className="flex flex-col space-y-2">
        <h2 className="font-medium text-[25px] text-[#F2F2F2] capitalize">
          {title}
        </h2>
        <h4 className="font-normal text-lg text-[#F2F2F2]">{sub_title}</h4>
      </div>

      {children}
    </div>
  );
};

export default DashboardPageHeader;
