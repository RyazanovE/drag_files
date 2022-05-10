import React from "react";

function App() {
  const [isDroppable, setisDroppable] = React.useState<boolean>(false);
  const [inputsValue, setinputsValue] = React.useState({
    name: "",
    files: new FormData(),
  })

  function dragHandler() {
    setisDroppable(p=>!p)
  }



  function dropHandler(e: React.ChangeEvent<HTMLInputElement>) {
   if (!e.target.files) {
     return
   }
    const newFiles = inputsValue.files
    Array.from(e.target.files).forEach((file) => {
      newFiles.append("file", file)
    })
    setinputsValue({...inputsValue, files: newFiles})
    setisDroppable(false)
  }

Array.from(inputsValue.files).forEach((item) => {
  console.log(item[1])
})
  return (
    <div className="h-screen w-screen flex">
      <nav className="h-full w-[300px] bg-slate-200"></nav>
      <div className="flex flex-1 h-full justify-center items-center">
        <div className="w-[80%] h-[80%] bg-slate-100 rounded-xl border-2 flex flex-col justify-center items-center">
          <input type="text" className="w-[60%] mb-5" onChange={(e) => {setinputsValue({...inputsValue, name: e.target.value})}}/>
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
                {Array.from(inputsValue.files).length > 0 && Array.from(inputsValue.files).map((file, ind) => {
                  
                  if (file[1] instanceof File) {
                    return <div className="p-2 " key={ind}>{file[1].name}</div>
                  }
                  
                })} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
