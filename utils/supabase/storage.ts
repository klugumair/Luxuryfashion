import { supabase } from './client';

export class SupabaseStorage {
  private bucketName = 'product-images';

  // Initialize storage bucket if it doesn't exist
  async initializeBucket() {
    try {
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();

      if (listError) {
        console.error('Error listing buckets:', listError);
        // If we can't list buckets, assume bucket exists and try to use it
        return true;
      }

      const bucketExists = buckets?.some(bucket => bucket.name === this.bucketName);

      if (!bucketExists) {
        console.log(`Bucket '${this.bucketName}' not found, it should be created via database migration`);
        // Don't try to create bucket here since it should be created via migration
        // Return true to proceed with upload attempts
        return true;
      }

      return true;
    } catch (error) {
      console.error('Error initializing bucket:', error);
      // Return true to attempt upload even if initialization fails
      return true;
    }
  }

  // Upload multiple images
  async uploadImages(files: File[]): Promise<string[]> {
    try {
      await this.initializeBucket();
      
      const uploadPromises = files.map(file => this.uploadSingleImage(file));
      const results = await Promise.all(uploadPromises);
      
      return results.filter(url => url !== null) as string[];
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  }

  // Upload a single image
  async uploadSingleImage(file: File): Promise<string | null> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (5MB max)
      if (file.size > 5242880) {
        throw new Error('Image must be less than 5MB');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload file
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading single image:', error);
      return null;
    }
  }

  // Delete an image
  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const bucketIndex = urlParts.findIndex(part => part === this.bucketName);
      
      if (bucketIndex === -1) {
        console.error('Invalid image URL');
        return false;
      }

      const filePath = urlParts.slice(bucketIndex + 1).join('/');

      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // Get signed URL for private images (if needed)
  async getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        console.error('Error creating signed URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      return null;
    }
  }

  // Validate image files
  validateFiles(files: FileList | File[]): { valid: File[], errors: string[] } {
    const validFiles: File[] = [];
    const errors: string[] = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file, index) => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        errors.push(`File ${index + 1}: Must be an image file`);
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5242880) {
        errors.push(`File ${index + 1}: Must be less than 5MB`);
        return;
      }

      // Check supported formats
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!supportedTypes.includes(file.type)) {
        errors.push(`File ${index + 1}: Must be JPEG, PNG, WebP, or GIF`);
        return;
      }

      validFiles.push(file);
    });

    return { valid: validFiles, errors };
  }
}

export const storageService = new SupabaseStorage();
