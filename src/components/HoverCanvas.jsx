import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Import images from the assets folder
import Image1 from "../assets/img (1).jpg";
import Image2 from "../assets/img (2).jpg";
import Image3 from "../assets/img (3).jpg";
import Image4 from "../assets/img (4).jpg";
import Image5 from "../assets/img (5).jpg";
import Image6 from "../assets/img (6).jpg";
import Image7 from "../assets/img (7).jpg";
import Image8 from "../assets/img (8).jpg";
import Image9 from "../assets/img (9).jpg";
import Image10 from "../assets/img (10).jpg";
import Image11 from "../assets/img (11).jpg";
import Image12 from "../assets/img (12).jpg";
import Image13 from "../assets/img (13).jpg";
import Image14 from "../assets/img (14).jpg";
import Image15 from "../assets/img (15).jpg";

const HoverCanvas = (props) => {
  const containerRef = useRef(null);
  const imageList = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
    Image12,
    Image13,
    Image14,
    Image15,
  ];
  const lastImageTime = useRef(0);
  const imageIndex = useRef(0);

  useEffect(() => {
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    let images = [];
    const CREATION_DELAY = 150; // Delay between creating images (in milliseconds)

    const createImage = () => {
      const currentTime = Date.now();

      // Only create a new image if enough time has passed
      if (currentTime - lastImageTime.current < CREATION_DELAY) {
        return;
      }

      const src = imageList[imageIndex.current];
      imageIndex.current = (imageIndex.current + 1) % imageList.length;
      lastImageTime.current = currentTime;

      const img = document.createElement("img");
      img.src = src;

      img.style.position = "absolute";
      img.style.width = "150px";
      img.style.height = "200px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "2%";
      img.style.pointerEvents = "none";
      img.style.opacity = "1";
      img.style.backgroundColor = "white";
      img.style.padding = "10px";
      img.style.boxShadow = "2px 2px 5px";
      img.style.transform = "translate(-50%, -50%)"; // Center the image on the cursor

      document.body.appendChild(img);
      images.push(img);

      // Position the image
      gsap.set(img, {
        left: pointer.x,
        top: pointer.y,
      });

      // Fade out animation
      gsap.to(img, {
        opacity: 0,
        duration: 3,
        ease: "power1.out",
        onComplete: () => {
          images = images.filter((image) => image !== img);
          img.remove();
        },
      });
    };

    const updatePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      createImage();
    };

    const handleMouseEnter = () => {
      window.addEventListener("mousemove", updatePointer);
    };

    const handleMouseLeave = () => {
      window.removeEventListener("mousemove", updatePointer);
      // Fade out all existing images
      images.forEach((img) => {
        gsap.to(img, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            img.remove();
          },
        });
      });
      images = [];
    };

    const container = containerRef.current;
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", updatePointer);
      images.forEach((img) => img.remove());
    };
  }, []);

  const handleTriggerSideBar = () => {
    props.setTrigger(true);
  };

  return (
    <div
      ref={containerRef}
      style={{
        // width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
      className="d-flex flex-column  justify-content-center align-items-center"
    >
      <h2>Another Day to Remember</h2>
      <p>Hover over this area!</p>
      <button
        className="btn btn-outline-primary"
        onClick={handleTriggerSideBar}
      >
        Press Me
      </button>
    </div>
  );
};

export default HoverCanvas;
