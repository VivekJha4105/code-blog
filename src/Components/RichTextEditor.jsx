import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RichTextEditor({ name, label, control, defaultValue = "" }) {
  return (
    <section className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "autoresize",
                "autosave",
                "bbcode",
                "charmap",
                "code",
                "codesample",
                "directionality",
                "emoticons",
                "fullpage",
                "fullscreen",
                "help",
                "hr",
                "image",
                "imagetools",
                "importcss",
                "insertdatetime",
                "legacyoutput",
                "link",
                "lists",
                "media",
                "nonbreaking",
                "noneditable",
                "pagebreak",
                "paste",
                "preview",
                "print",
                "quickbars",
                "save",
                "searchreplace",
                "spellchecker",
                "tabfocus",
                "table",
                "template",
                "textcolor",
                "textpattern",
                "toc",
                "visualblocks",
                "visualchars",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | help",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </section>
  );
}

export default RichTextEditor;
