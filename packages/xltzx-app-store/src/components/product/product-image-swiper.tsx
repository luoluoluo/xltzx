"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import Swiper core and required modules
import { SkuFile, SpuMedia } from "@/generated/graphql";
import { cn, getFileUrl } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

export const ProductImageSwiper = ({ className, medias }: { className?: string; medias: SpuMedia[] | SkuFile[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  useEffect(() => {
    setActiveIndex(0);
    swiper?.slideTo(0);
  }, [swiper, medias]);
  return (
    <>
      <div className={cn(`w-full lg:w-[480px]`, className)}>
        <Swiper
          className="relative"
          modules={[Pagination, Navigation]}
          loop
          spaceBetween={50}
          slidesPerView={1}
          // pagination={{
          //   clickable: true,
          //   renderBullet: function (index, className) {
          //     console.log(index);
          //     console.log(className);
          //     return `
          //   <img
          //     src="${getFileUrl(medias[index]?.fileId || "")}"
          //     alt=""
          //     class="${className} p-1  object-cover object-center"
          //   />
          // `;
          //   }
          // }}
          onSwiper={swiper => {
            setSwiper(swiper);
          }}
          // onSlideChange={e => {
          //   setActiveIndex(e.activeIndex);
          //   console.log(e.activeIndex);
          // }}
        >
          {medias.map((v, k) => (
            <SwiperSlide key={k}>
              <>
                <Image
                  priority
                  width={480}
                  height={480}
                  src={getFileUrl(v.fileId || "")}
                  alt=""
                  className="w-full h-[100vw] lg:w-[480px] lg:h-[480px]  object-cover object-center"
                />
                <div className="lg:hidden absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm rounded-sm px-2 ">{`${k + 1}/${medias.length}`}</div>
              </>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" hidden lg:flex w-full justify-center gap-4 mt-4 ">
          {medias.map((v, k) => (
            <Image
              priority
              key={k}
              width={48}
              height={48}
              src={getFileUrl(v.fileId || "")}
              alt=""
              className={`w-12 h-12 object-cover object-center border ${activeIndex === k ? "border-primary" : ""}`}
              onClick={() => {
                swiper?.slideTo(k);
                setActiveIndex(k);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
