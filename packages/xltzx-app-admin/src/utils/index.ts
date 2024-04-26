const baseApiUrl = import.meta.env.VITE_API_URL;
export const getFileUrl = (fileId: string) => {
  return `${baseApiUrl}/file?id=${fileId}`;
};

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
