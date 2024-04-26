import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
// import Underline from "@tiptap/extension-underline";
import { Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Image from "@tiptap/extension-image";

import * as Icons from "@ant-design/icons";

import "./index.css";

const baseUrl = import.meta.env.VITE_API_URL;

const MenuBar = ({ editor, isFull, onChangeFull }: { editor: Editor; isFull: boolean; onChangeFull: () => void }) => {
  if (!editor) {
    return null;
  }

  const [loading, setLoading] = useState(false);

  return (
    <div className="editor-menu-container">
      <>
        <button className="editor-menu-item-container">
          <Tooltip title="图片">
            <div className=" relative">
              <input
                className=" opacity-0 w-[16px] h-[16px] p-0 m-0 absolute top-0 left-0"
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                onChange={e => {
                  if (loading) return;
                  setLoading(true);
                  const file = e.currentTarget.files ? e.currentTarget.files[0] : undefined;
                  if (!file) return;
                  const formData = new FormData();
                  formData.append("file", file);
                  fetch(`${baseUrl}/file`, {
                    method: "POST",
                    body: formData
                  })
                    .then(res => {
                      setLoading(false);
                      if (!res.ok) {
                        console.log(res);
                        throw new Error("上传失败");
                      }
                      return res.json();
                    })
                    .then(res => {
                      editor
                        .chain()
                        .focus()
                        .setImage({ src: `${baseUrl}/file?id=${res.id}` })
                        .run();
                    })
                    .catch(e => {
                      setLoading(false);
                      console.log(e);
                    });
                }}
              />
              {loading ? <Spin size="small" /> : <Icons.FileImageOutlined />}
            </div>
          </Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active editor-menu-item-container" : "editor-menu-item-container"}
        >
          <Tooltip title="Bold">
            <Icons.BoldOutlined />
          </Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active editor-menu-item-container" : "editor-menu-item-container"}
        >
          <Tooltip title="Italic">
            <Icons.ItalicOutlined />
          </Tooltip>
        </button>
        {/* <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active editor-menu-item-container" : "editor-menu-item-container"}
        >
          <Tooltip title="Strike Through">
            {" "}
            <Icons.StrikethroughOutlined />
          </Tooltip>
        </button> */}

        {/* <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active editor-menu-item-container" : "editor-menu-item-container"}
        >
          <Tooltip title="Underline">
            <UnderlineOutlined />
          </Tooltip>
        </button> */}

        {/* <button
          onClick={() => editor.chain().focus().toggleDoubleUnderline().run()}
          className={editor.isActive("double-underline") ? "is-active editor-menu-item-container" : "editor-menu-item-container"}
        >
          <Tooltip title="Double Underline">
            <img
              src={doubleUnderlineIcon}
              alt="double-underline"
              style={{ width: "19px", height: "19px", marginBottom: "3px" }}
            />
          </Tooltip>
        </button> */}

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active editor-menu-item-container" : "editor-menu-item-container"}
        >
          <Tooltip title="Paragraph">P</Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Heading One">
            H<sup>1</sup>
          </Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Heading Two">
            H<sup>2</sup>
          </Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Heading Three">
            H<sup>3</sup>
          </Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Heading Four">
            H<sup>4</sup>
          </Tooltip>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().setTextAlign("left").run();
          }}
          className={
            editor.isActive({ textAlign: "left" }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Left Align">
            <Icons.AlignLeftOutlined />
          </Tooltip>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().unsetTextAlign().run();
            editor.chain().focus().setTextAlign("right").run();
          }}
          className={
            editor.isActive({ textAlign: "right" }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Right Align">
            <Icons.AlignRightOutlined />
          </Tooltip>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().unsetTextAlign().run();
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active editor-menu-item-container" : "editor-menu-item-container"
          }
        >
          <Tooltip title="Center Align">
            <Icons.AlignCenterOutlined />
          </Tooltip>
        </button>

        {/* <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="editor-menu-item-container"
          disabled={!editor.can().undo()}
        >
          <Tooltip title="Undo">
            <UndoOutlined />
          </Tooltip>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="editor-menu-item-container"
          disabled={!editor.can().redo()}
        >
          <Tooltip title="Redo">
            <RedoOutlined />
          </Tooltip>
        </button> */}
        <button type="button" onClick={onChangeFull} className="editor-menu-item-container">
          {isFull ? (
            <Tooltip title="Exit Full Screen">
              <Icons.FullscreenExitOutlined />
            </Tooltip>
          ) : (
            <Tooltip title="Full Screen">
              <Icons.FullscreenOutlined />
            </Tooltip>
          )}
        </button>
      </>
    </div>
  );
};

export const CustomEditor = ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => {
  const [isFull, setIsFull] = useState(false);

  const editor = useEditor({
    // useBuiltInExtension: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),

      Highlight,
      Image
    ],
    onCreate({ editor }) {
      console.log("On Create Editor", editor.getHTML());
    },
    onUpdate({ editor }) {
      const data = editor.getHTML();
      onChange && onChange(data);
    }
  });

  useEffect(() => {
    if (!editor) return;
    let { from, to } = editor.state.selection;
    if (value) {
      editor.commands.setContent(value, false, {
        preserveWhitespace: "full"
      });
    }
    editor.commands.setTextSelection({ from, to });
  }, [editor, value]);

  return (
    <>
      <div className={`editor-container ${isFull ? "editor-container--full" : ""}`}>
        <MenuBar
          editor={editor!}
          isFull={isFull}
          onChangeFull={() => {
            setIsFull(!isFull);
          }}
        />
        <>
          <EditorContent editor={editor} />
        </>
        {/* )} */}
      </div>
      {/* {open && (
        <ShowEquationData open={open} setOpen={setOpen} equation="currency" />
      )} */}
    </>
  );
};
