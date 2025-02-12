import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { useAuth } from "../../contexts/AuthContext";
import { fetchUsersPost } from "../../services/UserServiceHttp";
import { Endpoints } from "../../backend/endpoints";
import { api } from "../../backend/api";

type PhotoType = {
  imgId: string;
  image: string;
};

const HomePage = () => {
  const { firstName, lastName, email } = useAuth();

  const [pic, setPic] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socket = new WebSocket(`${Endpoints.WSS}?email=${email}`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      fetchPhotos();
    };
    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      fetchPhotos();
    };
    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchPhotos = async () => {
    try {
      const results = await fetchUsersPost();
      setPhotos(results.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPic(event.target.files[0]);
    } else {
      setPic(null);
    }
  };

  const handleUpload = async () => {
    if (!pic) return;

    const formData = new FormData();
    formData.append("pic", pic);

    try {
      setUploading(true);
      const response = await api.post(`${Endpoints.PHOTOS}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });

      setPic(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <section className="bg-orange-500 rounded-sm p-3 text-center text-white">
        <h1 className="text-[1.5rem] font-bold">
          Welcome back {firstName} {lastName} !!
        </h1>
        <p className="mt-2">This is the Home Page of the Photo Blog App.</p>
      </section>

      {/* Upload Section */}
      <section className="mt-8 max-w-[75rem] mx-auto">
        <div>
          <h2 className="text-[1.1rem] font-bold text-center text-gray-600 mb-3">
            Upload Image for Processing
          </h2>
          <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
            <Label
              htmlFor="file-upload"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Upload a Photo
            </Label>
            <Input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {uploading && <Progress value={uploadProgress} className="mt-2" />}
            <Button
              onClick={handleUpload}
              className="mt-4 w-full bg-orange-600 hover:bg-orange-300"
              disabled={!pic || uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>

        {/* Images Section */}
        <div className="mt-6">
          <h2 className="text-[1.1rem] font-bold text-gray-600 mb-2">
            All User's Posts
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
                  <div className="flex justify-between items-center p-1">
                    <Button className="bg-orange-600/90 hover:bg-orange-600">
                      Share
                    </Button>
                    <Button className="bg-red-600/90 hover:bg-red-600">
                      Delete
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
      </section>
    </div>
  );
};

export default HomePage;
