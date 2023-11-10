/* eslint-disable @typescript-eslint/no-explicit-any */
import DropboxChooser from "./components/dropbox-chooser";
// import './App.css'

function App() {
  const request = (url: string | URL) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.addEventListener(
      "load",
      function () {
        const buffer = xhr.response;
        console.log(buffer);
      },
      false
    );
    xhr.send();
  };

  const onSuccess = (files: { link: any }[]) => {
    // console.log('onSuccess', files)
    // const { link } = files[0];
    console.log(files);
  };

  const onCancel = (file: any) => {
    console.log(file);
  };

  return (
    <div>
      <DropboxChooser onSuccess={onSuccess} onCancel={onCancel} />
    </div>
  );
}

export default App;
