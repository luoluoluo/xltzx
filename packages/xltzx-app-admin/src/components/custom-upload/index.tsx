import { Upload } from "antd";
import * as Icons from "@ant-design/icons";
import { genId } from "@/utils";
const baseUrl = import.meta.env.VITE_API_URL;
const uploadButton = (
  <button style={{ border: 0, background: "none" }} type="button">
    <Icons.PlusOutlined />
    <div style={{ marginTop: 8 }}>上传</div>
  </button>
);
interface Value {
  fileId: string;
}
export const CustomUpload = (props: {
  max?: number;
  value?: Value[] | string;
  onChange?: (value?: Value[] | string) => void;
}) => {
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const max = props.max || 1;
  const values: Value[] = props.value ? (max === 1 ? [{ fileId: props.value as string }] : (props.value as Value[])) : [];
  const defaultFileList = values.map(v => ({
    uid: genId(),
    name: v.fileId,
    url: `${baseUrl}/file?id=${v.fileId}`
    // status: "done"
  }));
  console.log(values.length, props, defaultFileList);
  return (
    <Upload
      name="file"
      listType="picture-card"
      multiple={max > 1}
      accept="image/png, image/gif, image/jpeg, image/webp"
      defaultFileList={defaultFileList}
      maxCount={max}
      action={`${baseUrl}/file`}
      onChange={e => {
        const findIndex = e.fileList?.findIndex(file => file.uid === e.file.uid);
        switch (e.file.status) {
          case "done":
            console.log(e);
            props.onChange &&
              props.onChange(
                max === 1
                  ? e.file.response.id
                  : [
                      ...values,
                      {
                        fileId: e.file.response.id
                      }
                    ]
              );
            break;
          case "removed":
            values?.splice(findIndex, 1);
            props.onChange && props.onChange(max === 1 ? undefined : [...values]);
            break;
          default:
            break;
        }
        console.log(e, "2233");
      }}
    >
      {values.length >= max ? null : uploadButton}
    </Upload>
  );
};
