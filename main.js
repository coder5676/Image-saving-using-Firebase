import { ref, deleteObject } from "firebase/storage";
mport { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

async function uploadImage(file) {
  const storageRef = storage.ref();
  const imagesRef = storageRef.child('uploads/' + file.name);

  await imagesRef.put(file);
  const downloadURL = await imagesRef.getDownloadURL();

  console.log("Image uploaded! URL:", downloadURL);
  return downloadURL;
}
//get image from users local storage using input and save it to database and get url in return.
async function handleFileChange(e) {
  const file = e.target.files[0];

  if (file) {
    const url = await uploadImage(file);
    console.log("Uploaded Image URL:", url);

    // You can now add it to your tree as an <img src={url} />
    // Example:
    addelement("", "img", {
      src: url,
      style: {
        width: "200px",
        height: "auto",
        position: "absolute",
        transform: "translate(100px, 100px)"
      },
      x: "100",
      y: "100"
    }, [{ funcname: "showid", param: ["$id"] }], selectedcomp);
  }
}



//delete image 
async function deleteImage(url) {
  const imgRef = storage.refFromURL(url);

  try {
    await imgRef.delete();
    console.log("Image deleted successfully!");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
