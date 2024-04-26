"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Banner } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CustomStyle = () => {
  return (
    <style global jsx>{`
      .swiper-pagination-bullet {
        width: 1.5rem;
        height: 0.4rem;
        margin: 0 0.3rem !important;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 2px #fff;
        opacity: 1;
        background: #fff;
        /* border: 1px solid hsl(var(--primary)); */
        border-radius: 0.2rem;
      }
      .swiper-pagination-bullet-active {
        border: 1px solid hsl(var(--primary));
        background: hsl(var(--primary));
      }

      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 1.5rem;
        color: #fff !important;
        padding: 8px;
        background: rgba(0, 0, 0, 0.3);
      }
      @media (min-width: 1024px) {
        .swiper-pagination-bullets {
          bottom: 0.5rem !important;
        }
      }
    `}</style>
  );
};

export const BannerSwiper = ({ data }: { data: Banner[] }) => {
  return (
    <>
      <div className="w-full lg:container lg:mt-8">
        <CustomStyle />
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={data.length > 1}
          spaceBetween={50}
          autoplay={{ delay: 5000 }}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<div key="${index}" class="${className}"></div>`;
            }
          }}
          // onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {data?.map((banner: Banner, index: number) => (
            <SwiperSlide key={index}>
              <>
                <Link href={banner?.link || ""} className="relative flex flex-col justify-center items-center w-full">
                  <Image
                    priority
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover object-center"
                    src={getFileUrl(banner?.fileId!)}
                    // loading="auto"
                    alt=""
                  />
                  {/* <div className=" absolute bottom-2 right-2 text-white bg-black bg-opacity-30 px-4 py-2 rounded-sm text-xs">{`${index + 1}/${data.length}`}</div> */}
                  {/* <div className="h-[2rem] w-full"></div> */}
                  {/* <div className="container pt-4 lg:hidden">
                    <div className="flex flex-col items-center">
                      <div className="text-center text-4xl text-black font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {banner?.title}
                      </div>
                      <Link
                        href={banner?.link || ""}
                        className="rounded shadow-sm border text-black active:bg-primary active:text-white active:border-primary cursor-pointer inline-flex px-6 py-2 mt-4 transition-all duration-200 ease-in-out"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div> */}
                </Link>
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <CustomStyle />
    </>
  );
};
