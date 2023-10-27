"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export function UploadForm({ ...props }) {
  const [files, setFiles] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!files || !files.length) return;
    console.log(files);

    try {
      const data = new FormData();
      for (let i = 0; i < files.length; ++i) data.append(`files`, files[i]);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/embed`,
        {
          method: "POST",
          body: data,
        }
      );
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      toast.success((await res.json()).message);
      setFiles(null);
    } catch (e) {
      // Handle errors here
      console.error(e);
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit} {...props}>
      <label
        htmlFor="file"
        className="rounded border-2 border-[#0d6efd] p-2 text-sm flex-1 text-center"
      >
        🟡 Files
      </label>
      <input
        type="file"
        name="file"
        id="file"
        multiple
        onChange={(e) => {console.log("AAA"); setFiles(e.target.files)}}
        hidden
      />
      <input
        type="submit"
        value="✅ Upload"
        className="rounded border-2 border-[#b02a37] ml-2 p-2 text-sm flex-1 text-center"
        style={{ visibility: files?.length > 0 ? "visible" : "hidden" }}
      />
    </form>
  );
}
