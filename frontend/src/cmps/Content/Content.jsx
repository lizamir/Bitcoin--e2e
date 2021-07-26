import React, { useState, useEffect, useRef } from "react";

import "./Content.scss";

export const Content = ({ imgUrl }) => {
  const canvas = useRef(null);
  const ctx = canvas.current?.getContext("2d");
  const demoImg = useRef(null);
  const [degrees, setDegrees] = useState(0)

  const drawRotated = () => {
    let offsetWidth = demoImg.current?.offsetWidth
    let offsetHeight = demoImg.current?.offsetHeight
    console.log('drawing...')
    console.log('offsetWidth:', offsetWidth)
    console.log('offsetHeight:', offsetHeight)
    console.log('degrees:', degrees)
    console.log('ctx:', ctx)
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
  
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save()
  
    // move to the center of the canvas
    ctx.translate(canvas.current.width / 2, canvas.current.height / 2)
  
    // rotate the canvas to the specified degrees
    ctx.rotate((degrees * Math.PI) / 180)
  
    // draw the image
    // since the context is rotated, the image will be rotated also
    ctx.drawImage(
      demoImg.current,
      -offsetWidth / 2,
      -offsetHeight / 2,
      offsetWidth,
      offsetHeight
    )
  
    // we’re done with the rotating so restore the unrotated context
    ctx.restore()
  }
  

  useEffect(() => {
    if (imgUrl && canvas) {
      demoImg.current.onload = drawRotated
    }
  }, [imgUrl, canvas]);

  const onRotate = () => {
    setDegrees(degrees + 90)
  };

  useEffect(()=>{
    console.log('rotation change detected...')
    if (imgUrl && canvas) {
      drawRotated()
    }
  }, [degrees])

  return (
    <div>
      <img className="demo-image" src={imgUrl} ref={demoImg} alt="" width="400" height="400" />
      {/* <img className="demo-image" src="https://global-uploads.webflow.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg" ref={demoImg} alt="" /> */}
      <h1>content</h1>
      <canvas ref={canvas} width={400} height={400} />
      <button onClick={onRotate}>Rotate</button>
    </div>
  );
};
