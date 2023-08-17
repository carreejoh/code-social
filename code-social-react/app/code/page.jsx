import Sidebar from "./codeComponents/sidebar";
import CodeBody from "./codeComponents/codeBody";

function Code() {
  return (
    <div className="h-[100vh] overflow-y-hidden w-full flex">
      <Sidebar />
      <div className="pt-12 w-full bg-darkestBlack">
        <div className="w-full h-12 flex items-center justify-center">
          <h1>File.js</h1>
        </div>
        <div className="h-[95vh] w-full overflow-y-hidden">
            <CodeBody/>
        </div>
      </div>
    </div>
  );
}

export default Code;
