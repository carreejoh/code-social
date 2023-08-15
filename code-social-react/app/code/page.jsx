import Sidebar from "./codeComponents/sidebar";

function Code() {

  return (
    <>
      <Sidebar />
      <div className="h-[100vh] overflow-y-hidden w-full pl-12 pt-12 bg-mainDarkGray">
        <div className="flex">
          {/* <div className={`${files ? "hidden" : "block"}`}>
            <YourFiles />
          </div> */}

          <div className="w-full h-12 flex items-center justify-center pr-12">
            <h1>File.js</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Code;
