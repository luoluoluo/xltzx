import { Spu } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { AmountFormat } from "../amount";

export const ProductItem = ({ data }: { data: Spu }) => {
  const detailUrl = `/product/${data.id}?skuId=${data.skuId}`;
  return (
    <Link
      href={detailUrl}
      className="group flex flex-col items-center box-border flex-shrink-0  relative shadow rounded overflow-hidden"
    >
      <div className="flex flex-col items-center w-full overflow-hidden relative box-border">
        <Image
          priority
          width={480}
          height={480}
          src={getFileUrl(data?.fileId || "", { w: 960, h: 960 })}
          alt=""
          className="lg:group-hover:scale-110 group-active:scale-110 transition-all duration-500 ease-in-out box-border flex-shrink-0 w-full h-auto object-cover object-center "
        />
      </div>
      <div className="flex flex-col p-2 w-full">
        <div className="w-full h-6 leading-6 inline-block overflow-hidden">{data.title}</div>
        <div className="text-sm mt-2">
          <AmountFormat size="sm" value={data.sku?.price || 0} />
        </div>
      </div>
      <div className="hidden lg:block opacity-0 absolute left-0 bottom-[7rem] w-full py-2 px-8 box-border transition-all duration-200 ease-in-out group-hover:opacity-100">
        <div className="flex justify-center items-center w-full h-[2.5rem] rounded shadow-sm border text-black bg-white active:bg-primary active:text-white active:border-primary hover:bg-primary hover:text-white hover:border-primary cursor-pointer active:scale-110 transition-all duration-200 ease-in-out">
          立即购买
        </div>
      </div>
    </Link>
  );
};
