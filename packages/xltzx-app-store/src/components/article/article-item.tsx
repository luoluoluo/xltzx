import { Article } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export const ArticleItem = ({ data }: { data: Article }) => {
  const detailUrl = `/article/${data.id}`;
  return (
    <Link
      href={detailUrl}
      className="group flex flex-col box-border flex-shrink-0  relative shadow w-full rounded overflow-hidden"
    >
      <div className="flex flex-shrink-0 flex-col items-center relative box-border rounded overflow-hidden">
        <Image
          priority
          width={480}
          height={240}
          src={getFileUrl(data?.fileId || "", { w: 960, h: 480 })}
          alt=""
          className="lg:group-hover:scale-110 group-active:scale-110 transition-all duration-500 ease-in-out box-border flex-shrink-0 w-full h-auto object-cover object-center "
        />
      </div>
      <div className="w-full flex flex-col justify-between p-2">
        <div className="w-full h-12 leading-6 overflow-hidden inline-block">{data.title}</div>
        <div className="flex justify-end text-gray-500 text-sm mt-4">{dayjs(Number(data.createdAt)).format("YYYY-MM-DD")}</div>
      </div>
    </Link>
  );
};
