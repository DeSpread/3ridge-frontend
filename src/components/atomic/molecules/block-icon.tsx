import React, { useEffect } from "react";

const BlockIcon = (props: {
  seed: string;
  size?: number;
  scale?: number;
  color?: string;
  bgColor?: string;
  spotColor?: string;
}) => {
  let canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      generateBlockIcon(canvasRef.current);
    }
  }, [canvasRef, props.scale, props.seed]);

  const generateBlockIcon = (canvas: HTMLCanvasElement) => {
    const randseed: number[] = [0, 0, 0, 0];

    function seedrand(seed: string) {
      for (let i = 0; i < seed.length; i++) {
        randseed[i % 4] =
          (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
      }
    }

    const rand = () => {
      const t = randseed[0] ^ (randseed[0] << 11);

      randseed[0] = randseed[1];
      randseed[1] = randseed[2];
      randseed[2] = randseed[3];
      randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

      return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
    };

    const createColor = () => {
      // saturation is the whole color spectrum
      const h = Math.floor(rand() * 360);
      // saturation goes from 40 to 100, it avoids greyish colors
      const s = rand() * 60 + 40 + "%";
      // lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
      const l = (rand() + rand() + rand() + rand()) * 25 + "%";

      const color = "hsl(" + h + "," + s + "," + l + ")";
      return color;
    };

    const createImageData = (size: number) => {
      const width = size; // Only support square icons for now
      const height = size;

      const dataWidth = Math.ceil(width / 2);
      const mirrorWidth = width - dataWidth;

      const data = [];
      for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < dataWidth; x++) {
          // this makes foreground and background color to have a 43% (1/2.3) probability
          // spot color has 13% chance
          row[x] = Math.floor(rand() * 2.3);
        }
        const r = row.slice(0, mirrorWidth);
        r.reverse();
        row = row.concat(r);

        for (let i = 0; i < row.length; i++) {
          data.push(row[i]);
        }
      }

      return data;
    };

    const setCanvas = (
      identicon: HTMLCanvasElement,
      imageData: number[],
      color: string,
      scale: number,
      bgcolor: string,
      spotcolor: string
    ) => {
      const width = Math.sqrt(imageData.length);
      const size = width * scale;

      identicon.width = size;
      identicon.style.width = `${size}px`;

      identicon.height = size;
      identicon.style.height = `${size}px`;

      const cc = identicon.getContext("2d");
      if (!cc) {
        return;
      }

      cc.beginPath();
      cc.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      cc.clip();

      cc.fillStyle = bgcolor;
      cc.fillRect(0, 0, identicon.width, identicon.height);
      cc.fillStyle = color;

      for (let i = 0; i < imageData.length; i++) {
        // if data is 2, choose spot color, if 1 choose foreground
        cc.fillStyle = imageData[i] === 1 ? color : spotcolor;

        // if data is 0, leave the background
        if (imageData[i]) {
          const row = Math.floor(i / width);
          const col = i % width;

          cc.fillRect(col * scale, row * scale, scale, scale);
        }
      }
    };

    const size = props.size || 8;
    const scale = props.scale || 4;
    const seed =
      props.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);

    seedrand(seed);

    const color = props.color || createColor();
    const bgColor = props.bgColor || createColor();
    const spotColor = props.spotColor || createColor();
    const imageData = createImageData(size);

    setCanvas(canvas, imageData, color, scale, bgColor, spotColor);

    return canvas;
  };

  return <canvas ref={canvasRef} className="blcokicon" />;
};

export default BlockIcon;
