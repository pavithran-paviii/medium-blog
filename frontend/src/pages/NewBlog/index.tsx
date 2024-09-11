import axios from "axios";
import { NewArticleNavbar } from "../../components/Navbar";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  //functions
  async function createNewBlog() {
    console.log(blog, editorRef?.current?.innerHTML, "New blog content");
    setLocalLoading(true);
    try {
      let response = await axios.post(
        `https://backend.pavithranr65.workers.dev/api/v1/blog`,
        { title: blog, content: JSON.stringify(editorRef?.current?.innerHTML) },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("medium-clone")}`,
          },
        }
      );
      if (response.data?.status) {
        console.log(response, "Created new article");
        navigate("/");
      }
      setLocalLoading(false);
    } catch (error) {
      setLocalLoading(false);
      console.log(error, "Get all blogs error");
    }
  }

  return (
    <div>
      <NewArticleNavbar
        createNewBlog={createNewBlog}
        localLoading={localLoading}
      />
      <div className="max-w-screen-xl mx-auto flex flex-col justify-between w-full px-16 py-10">
        <input
          className="text-5xl border-l border-transparent outline-none pl-4 py-3 focus:border-gray-400"
          type="text"
          placeholder="Tell your story..."
          onChange={(event) => setBlog(event?.target?.value)}
        />
        <div className="text-xl">
          <QuillEditor editorRef={editorRef} />
        </div>
      </div>
    </div>
  );
};

export default NewBlog;

interface QuillEditorProps {
  editorRef: RefObject<HTMLDivElement>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ editorRef }) => {
  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        placeholder: "Compose an epic...",
        theme: "bubble",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // Text styling
            [{ header: 1 }, { header: 2 }], // Headers
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            ["link", "blockquote", "code-block"], // Links, blockquotes, code blocks
            [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
            [{ color: [] }, { background: [] }], // Text color and background
            [{ align: [] }], // Text alignment
          ],
        },
      });

      // Clear the editor's initial content to show the placeholder
      if (quill.getText().trim() === "") {
        quill.setText(""); // Ensure editor is empty to trigger the placeholder
      }
    }
  }, [editorRef]);

  return (
    <div>
      <div id="editor" ref={editorRef} className="text-xl my-8"></div>
    </div>
  );
};
