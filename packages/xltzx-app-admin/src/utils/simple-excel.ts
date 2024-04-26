import * as Excel from "exceljs";
import { saveAs } from "file-saver";

// export const importExcel = (e: any) => {
//   const reader = new FileReader();
//   reader.onload = async evt => {
//     await readExcel(evt.target?.result);
//   };
//   reader.readAsBinaryString(e.target.files[0]);
// };

export const readExcel = async (file: any): Promise<any[]> => {
  const workbook = new Excel.Workbook();
  //await workbook.xlsx.readFile(filename);从文件读取
  //await workbook.xlsx.read(stream);从流读取
  //await workbook.xlsx.load(data);从 buffer 加载
  const result = await workbook.xlsx.load(file);
  // 按 name 提取工作表 workbook.getWorksheet('My Sheet');
  // 按 id 提取工作表 workbook.getWorksheet(1);
  const worksheet = result.getWorksheet();
  const lines: any[] = [];
  //遍历工作表中具有值的所有行
  worksheet?.eachRow(function (row) {
    const line = row.values;
    lines.push(line);
  });
  return lines;
};

export const writeExcel = async (data: any[], columns: string[], title: string) => {
  const workbook = new Excel.Workbook();
  // workbook.creator = "test";
  let sheet = workbook.addWorksheet(title);
  sheet.columns = columns.map(column => ({ header: column }));
  sheet.addRows(data);
  console.log(data, columns);
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${title}.xlsx`);
};
