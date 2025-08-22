import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Card } from './card';
import { Badge } from './badge';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { storageService } from '../../utils/supabase/storage';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUpload({ images, onImagesChange, maxImages = 5, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      // Validate files
      const { valid, errors } = storageService.validateFiles(files);
      
      if (errors.length > 0) {
        toast.error('Invalid files', {
          description: errors.join(', ')
        });
        return;
      }

      if (valid.length === 0) {
        toast.error('No valid images selected');
        return;
      }

      // Upload images
      const uploadedUrls = await storageService.uploadImages(valid);
      
      if (uploadedUrls.length > 0) {
        const newImages = [...images, ...uploadedUrls];
        onImagesChange(newImages);
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      } else {
        toast.error('Failed to upload images');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Upload failed', {
        description: error.message || 'Please try again'
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];
    
    try {
      // Delete from storage if it's a Supabase URL
      if (imageUrl.includes('supabase')) {
        await storageService.deleteImage(imageUrl);
      }
      
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
      toast.success('Image removed');
    } catch (error) {
      console.error('Error removing image:', error);
      // Still remove from UI even if delete fails
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
      toast.warning('Image removed from form (but may still exist in storage)');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Upload Area */}
        <Card
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            disabled={uploading || images.length >= maxImages}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WebP or GIF (max 5MB each)
                </p>
                <p className="text-xs text-gray-500">
                  {images.length}/{maxImages} images
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* URL Input Option */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Or add image URLs directly:</p>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  const url = input.value.trim();
                  if (url && images.length < maxImages) {
                    onImagesChange([...images, url]);
                    input.value = '';
                    toast.success('Image URL added');
                  } else if (images.length >= maxImages) {
                    toast.error(`Maximum ${maxImages} images allowed`);
                  }
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                const url = input?.value.trim();
                if (url && images.length < maxImages) {
                  onImagesChange([...images, url]);
                  input.value = '';
                  toast.success('Image URL added');
                } else if (images.length >= maxImages) {
                  toast.error(`Maximum ${maxImages} images allowed`);
                }
              }}
            >
              Add URL
            </Button>
          </div>
        </div>

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA4MEg0MFY2MEg2MFY4MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTE2MCA4MEgxNDBWNjBIMTYwVjgwWiIgZmlsbD0iIzlDQTRBRiIvPgo8cGF0aCBkPSJNMTAwIDEyMEM5MC42IDEyMCA4MyAxMTIuNCA4MyAxMDNDODMgOTMuNiA5MC42IDg2IDEwMCA4NkMxMDkuNCA4NiAxMTcgOTMuNiAxMTcgMTAzQzExNyAxMTIuNCAxMDkuNCAxMjAgMTAwIDEyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTQwIDEyMEgxNjBWMTQwSDQwVjEyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4K';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-blue-500">
                      Main
                    </Badge>
                  )}
                </Card>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="text-center py-8">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No images added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
