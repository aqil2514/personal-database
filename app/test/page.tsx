// "use client";

import FileUpload from "@/components/General/FileUpload";
import Cloudinary from "@/lib/cloudinary";

// import { AdvancedImage } from "@cloudinary/react";
// import { fill } from "@cloudinary/url-gen/actions/resize";
// import { Cloudinary } from "@cloudinary/url-gen/index";

// export default function Test() {
//   const cld = new Cloudinary({
//     cloud: {
//       cloudName: "dwcr3rpgi",
//     },
//   });

//   const myImage = cld.image("cld-sample-5");

//   myImage.resize(fill().width(250).height(250));

//   return (
//     <div>
//       <h1>ok</h1>
//       <AdvancedImage cldImg={myImage} />
//     </div>
//   );
// }

export default function Test() {
  return (
    <>
      <FileUpload />
    </>
  );
}
