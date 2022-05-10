import React from "react";

function App() {
  const [isDroppable, setisDroppable] = React.useState<boolean>(false);
  const [inputsValue, setinputsValue] = React.useState({
    name: "",
    files: new FormData(),
  });

  function dragHandler() {
    setisDroppable((p) => !p);
  }

  function deleteHandler(fileName: string) {
    const filestoUpdate = inputsValue.files
    filestoUpdate.delete(fileName)
    setinputsValue({ ...inputsValue, files: filestoUpdate});
  }

  function dropHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const newFiles = inputsValue.files;
    Array.from(e.target.files).forEach((file) => {
      if (inputsValue.files.has(file.name)) return;
      newFiles.append(`${file.name}`, file);
    });
    setinputsValue({ ...inputsValue, files: newFiles });
    setisDroppable(false);
  }

  function sendHandler() {
    console.log(inputsValue)
  }

  return (
    <div className="h-screen w-screen flex">
      <nav className="h-full w-[300px] bg-slate-200"></nav>
      <div className="flex flex-1 h-full justify-center items-center">
        <div className="w-[80%] h-[80%] bg-slate-100 rounded-xl border-2 flex flex-col justify-center items-center">
          <button onClick={sendHandler} className="bg-blue-200 rounded p-3 mb-5">Send</button>
          <input
            type="text"
            className="w-[60%] mb-5"
            onChange={(e) => {
              setinputsValue({ ...inputsValue, name: e.target.value });
            }}
          />
          <div className="w-[300px] h-[100px] p-10 hover:bg-slate-100 bg-white rounded-lg border-red-300 border-2 border-dashed relative flex justify-center items-center">
            {!isDroppable ? (
              <label htmlFor="" className="">
                Перетащите файлы или нажмите для загрузки
              </label>
            ) : (
              <label htmlFor="" className="">
                Отпустите файлы
              </label>
            )}
            <input
              multiple
              type="file"
              className="absolute left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
              onDragEnter={dragHandler}
              onDragLeave={dragHandler}
              onChange={dropHandler}
            />
          </div>
          <div className="flex flex-col w-[300px] mt-4 bg-white rounded">
            {Array.from(inputsValue.files).length > 0 &&
              Array.from(inputsValue.files).map((file, ind) => {
                if (file[1] instanceof File) {
                  return (
                    <div
                      className="p-2 flex justify-between items-center"
                      key={ind}
                    >
                      <p>{file[1].name}</p>
                      <button
                        onClick={() => {
                          deleteHandler(file[0]);
                        }}
                        className="w-[20px] h-[20px] hover:bg-red-400 rounded-lg hover  bg-red-300 flex justify-center items-center"
                      >
                        x
                      </button>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
