import dayjs from "dayjs";
let lastId = 0;
// 自增id
export const genId = function (): string {
  let id = new Date().getTime();
  if (id > lastId) {
    lastId = id;
    return String(id);
  } else {
    lastId += 1;
    return String(lastId);
  }
};

export const getPeriod = function (offset = 0): string {
  return dayjs().add(offset, "month").format("YYYYMM");
};

export const getStoragePath = () => {
  return process.env.STORSGE_PATH || `${process.cwd()}/files`;
};
