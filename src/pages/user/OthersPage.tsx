import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { fetchOthersPost } from "../../services/UserServiceHttp";

type PhotoType = {
  imgId: string;
  image: string;
};

export const OthersPage = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPhotos();
  }, []);
  const fetchPhotos = async () => {
    try {
      const results = await fetchOthersPost();
      setPhotos(results.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Images Section */}
      <div className="mt-6">
        <h2 className="text-[1.1rem] font-bold text-gray-600 mb-2">
          All Posts of Other Users
        </h2>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden shadow-md"
              >
                <CardContent className="p-0">
                  <Skeleton className="w-full h-60" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : photos.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden shadow-md cursor-pointer"
              >
                <CardContent className="p-0">
                  <img
                    src={`data:image/png;base64,${photo.image}`}
                    alt={`Uploaded ${index}`}
                    className="w-full h-60 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // No images message
          <div className="text-center text-gray-500 mt-6">
            No images available
          </div>
        )}
      </div>
    </div>
  );
};
