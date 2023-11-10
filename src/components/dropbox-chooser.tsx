/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useMemo } from "react";
import loadScript from "load-script";

const DROPBOX_APP_KEY = "y9u0lys17l0fuum"; // App key
const DROPBOX_SDK_URL = "https://www.dropbox.com/static/api/2/dropins.js";
const DROPBOX_SCRIPT_ID = "dropboxjs";

export default function DropboxChooser({ children, onSuccess, onCancel }: any) {
  const options = useMemo(
    () => ({
      // Required. Called when a user selects an item in the Chooser.
      success: (files: any) => {
        console.log("success", files);
        onSuccess && onSuccess(files);
      },
      // Optional. Called when the user closes the dialog without selecting a file
      // and does not include any parameters.

      cancel: () => {
        console.log("cancel");
        onCancel && onCancel();
      },

      // Optional. "preview" (default) is a preview link to the document for sharing,
      // "direct" is an expiring link to download the contents of the file. For more
      linkType: "preview", // or "preview"
      multiselect: true,
      // extensions: ['.png', '.jpg', '.jpeg'],

      // Optional. A value of false (default) limits selection to files,
      // while true allows the user to select both folders and files.
      // You cannot specify `linkType: "direct"` when using `folderselect: true`.
      folderselect: false, // or true
    }),
    [onSuccess, onCancel]
  );

  useEffect(
    () =>
      loadScript(DROPBOX_SDK_URL, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        attrs: {
          id: DROPBOX_SCRIPT_ID,
          "data-app-key": DROPBOX_APP_KEY,
        },
      }),
    []
  );

  const handleChoose = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    if (window.Dropbox) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:next-line
      window.Dropbox.choose(options);
    }
  }, [options]);

  return (
    <div onClick={handleChoose}>
      {children || <button>dropbox chooser</button>}
    </div>
  );
}
