"use client";

import { useEffect, useState } from "react";

const ImagePreloader = ({ images }: { images: string[] }) => {
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = () => {
            setLoadedImages((prev) => prev + 1);
            resolve(img);
          };

          img.onerror = reject;
          img.src = imageUrl;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log("모든 이미지가 프리로드되었습니다.");
      } catch (error) {
        console.error("이미지 프리로드 중 오류 발생:", error);
      }
    };

    if (images?.length > 0) {
      preloadImages();
    }
  }, [images]);

  return (
    <div className="hidden">
      {/* 선택적: 로딩 상태 표시 */}
      <div className="sr-only">
        {loadedImages}/{images?.length} 이미지 로드됨
      </div>
    </div>
  );
};

export default ImagePreloader;
