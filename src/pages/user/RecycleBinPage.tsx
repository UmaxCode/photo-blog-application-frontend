import { useEffect, useState } from "react";
import { fetchUserRecycledPost } from "../../services/UserServiceHttp";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import {
  restorePostFromRecyclingBin,
  permanentlyDeletePost,
} from "../../services/UserServiceHttp";

type PhotoType = {
  imgId: string;
  image: string;
};

export const RecycleBinPage = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRestoringCardId, setIsRestoringCardId] = useState<string>();
  const [isDeletingCardId, setIsDeletingCardId] = useState<string>();

  useEffect(() => {
    fetchPhotos();
  }, []);
  const fetchPhotos = async () => {
    try {
      const results = await fetchUserRecycledPost();
      setPhotos(results.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const restorePhoto = async (id: string) => {
    setIsRestoringCardId(id);
    try {
      const results = await restorePostFromRecyclingBin(id);
      const removedPhotoId = results.data.imgId;
      const updatedPost = photos.filter(
        (photo) => photo.imgId !== removedPhotoId
      );
      console.log(removedPhotoId);
      setPhotos(updatedPost);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsRestoringCardId("");
    }
  };

  const permanentlyDeletePhoto = async (id: string) => {
    setIsDeletingCardId(id);
    try {
      const result = await permanentlyDeletePost(id);
      console.log(result);
      const updatedPost = photos.filter((photo) => photo.imgId !== id);
      setPhotos(updatedPost);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsDeletingCardId("");
    }
  };

  return (
    <div className="p-4">
      {/* Images Section */}
      <div className="mt-6">
        <h2 className="text-[1.1rem] font-bold text-gray-600 mb-2">
          All Recycled User Posts
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
                    src={`${photo.image}`}
                    alt={`Uploaded ${index}`}
                    className="w-full h-60 object-cover"
                  />
                </CardContent>
                <div className="flex justify-between items-center p-1">
                  <Button
                    className="bg-orange-600/90 hover:bg-orange-600"
                    onClick={() => restorePhoto(photo.imgId)}
                  >
                    {isRestoringCardId == photo.imgId ? "Restoring" : "Restore"}
                  </Button>
                  <Button
                    className="bg-red-600/90 hover:bg-red-600"
                    onClick={() => permanentlyDeletePhoto(photo.imgId)}
                  >
                    {isDeletingCardId == photo.imgId
                      ? "Deleting"
                      : "Permanently Delete"}
                  </Button>
                </div>
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
