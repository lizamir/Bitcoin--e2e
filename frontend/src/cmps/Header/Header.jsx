import React, { useState ,useEffect, useRef } from "react";
import { Content } from "../Content";

import "./Header.scss";

export const Header = () => {
  const [imgSrc,setImgSrc] = useState(null);
  const convertFileToUrl= (file)=>{

    if (FileReader) {
      var fr = new FileReader();
      fr.onload = () => {
        setImgSrc(fr.result) ;
      }
      fr.readAsDataURL(file);

  }
}
  
  return (
    <div>
    <div className="flex align-center space-between header-layout header">
      <div className="flex align-center logo">
        <img
          src={require("../../assets/img/lupa.png").default}
          alt="save"
          className="img-logo"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e)=> convertFileToUrl(e.target.files[0]) }
        className="el-btn"/>
    </div>
    <Content imgUrl={imgSrc} />
    </div>
  );
  }
