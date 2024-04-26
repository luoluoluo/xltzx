import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { upload } from "@/utils/request";
import { getFileUrl } from "@/utils";
import { message } from "antd";

export const CustomEditor = ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => {
  const editorRef = useRef<any>(null);

  return (
    <>
      <Editor
        apiKey="pg1kxo11vk8crrkrwp9bg6c1swa55y38yka79bep86d6vc6f"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onChange={() => {
          console.log(editorRef.current.getContent());
          onChange && onChange(editorRef.current.getContent());
        }}
        initialValue={value}
        init={{
          images_upload_handler: async blobInfo => {
            const hideMessage = message.loading("Uploading...", 0);
            const formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());
            return upload<{ id: string }>("/file", formData)
              .then(res => {
                hideMessage();
                const url = getFileUrl(res.id);
                return url;
              })
              .catch(err => {
                hideMessage();
                throw err;
              });
          },
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount"
          ],
          toolbar:
            "image | " +
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />
    </>
  );
};
