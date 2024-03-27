import { CardProps } from "@yext/search-ui-react";
import Ce_video from "../../types/videos";
import { useRef, useState, useCallback, useEffect } from "react";

const Video = ({ result }: CardProps<Ce_video>) => {
  const { name, description } = result;
  const { videos } = result.rawData;
 
  const videoURL = `https://www.youtube.com/embed/${videos[0].video.url.split("=")[1]}?autoplay=0`;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const defaultHeight = 495;
  const [videoHeight, setVideoHeight] = useState<number>(
    iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight
  );

  const handleChangeVideoWidth = useCallback(() => {
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
          ? 1.2
          : window.innerWidth > 400
            ? 1.45
            : 1.85;
    const height = iframeRef.current
      ? iframeRef.current.offsetWidth * 0.5625
      : defaultHeight;
    return setVideoHeight(Math.floor(height * ratio));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleChangeVideoWidth);
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
          ? 1.2
          : window.innerWidth > 400
            ? 1.45
            : 1.85;
    const height = iframeRef.current
      ? iframeRef.current.offsetWidth * 0.5625
      : defaultHeight;
    setVideoHeight(Math.floor(height * ratio));
    return function cleanup() {
      window.removeEventListener("resize", handleChangeVideoWidth);
    };
  }, [videoHeight, handleChangeVideoWidth]);
  return (
    <div className="flex flex-col gap-2 border p-2">
      <iframe
        ref={iframeRef}
        title={name}
        width="100%"
        height={`${videoHeight}px`}
        src={videoURL}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="text-lg font-medium">{name}</div>
      <div className="text-lg font-medium">{description}</div>
    </div>
  );
};

export default Video;
