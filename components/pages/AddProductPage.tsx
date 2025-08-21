import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { 
  Plus, 
  X, 
  Upload, 
  Save, 
  ArrowLeft, 
  Image as ImageIcon,
  Tag,
  Package,
  DollarSign,
  Palette,
  Ruler,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { AnimatedEmoji } from '../animations';

interface ProductFormData {
  name: string;
  description: string;
  short_description: string;
  price: number;
  original_price?: number;
  sku: string;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  materials: string[];
  care_instructions: string;
  weight_grams?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  stock_quantity: number;
  low_stock_threshold: number;
  featured: boolean;
  is_active: boolean;
  tags: string[];
  meta_title: string;
  meta_description: string;
  seo_keywords: string[];
}

const CATEGORIES = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'summer-collection', label: 'Summer Collection' }
];

const SUBCATEGORIES = {
  men: [
    'shirts', 'pants', 'jackets', 'shoes', 'activewear', 'underwear', 'sleepwear'
  ],
  women: [
    'dresses', 'tops', 'bottoms', 'outerwear', 'shoes', 'activewear', 'intimates', 'sleepwear'
  ],
  kids: [
    'boys-clothing', 'girls-clothing', 'baby-clothing', 'kids-shoes', 'kids-accessories'
  ],
  accessories: [
    'bags', 'jewelry', 'watches', 'sunglasses', 'hats', 'belts', 'scarves'
  ],
  'summer-collection': [
    'swimwear', 'summer-dresses', 'shorts', 'sandals', 'sun-hats', 'beach-accessories'
  ]
};

const COMMON_SIZES = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
  shoes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  kids: ['2T', '3T', '4T', '5T', '6', '7', '8', '10', '12', '14', '16'],
  accessories: ['One Size', 'S', 'M', 'L']
};

const COMMON_COLORS = [
  'Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 
  'Purple', 'Pink', 'Brown', 'Beige', 'Cream', 'Khaki', 'Olive', 'Burgundy', 'Teal'
];

export default function AddProductPage() {
  const { setCurrentPage, addProduct, isLoading } = useAppContext();
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentMaterial, setCurrentMaterial] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    short_description: '',
    price: 0,
    original_price: undefined,
    sku: '',
    category: '',
    subcategory: '',
    brand: '',
    images: [],
    sizes: [],
    colors: [],
    materials: [],
    care_instructions: '',
    weight_grams: undefined,
    dimensions: undefined,
    stock_quantity: 0,
    low_stock_threshold: 10,
    featured: false,
    is_active: true,
    tags: [],
    meta_title: '',
    meta_description: '',
    seo_keywords: []
  });

  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: keyof ProductFormData, value: string) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeFromArray = (field: keyof ProductFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (currentImageUrl.trim() && !formData.images.includes(currentImageUrl.trim())) {
      addToArray('images', currentImageUrl);
      setCurrentImageUrl('');
    }
  };

  const addTag = () => {
    if (currentTag.trim()) {
      addToArray('tags', currentTag);
      setCurrentTag('');
    }
  };

  const addKeyword = () => {
    if (currentKeyword.trim()) {
      addToArray('seo_keywords', currentKeyword);
      setCurrentKeyword('');
    }
  };

  const addMaterial = () => {
    if (currentMaterial.trim()) {
      addToArray('materials', currentMaterial);
      setCurrentMaterial('');
    }
  };

  const addSize = (size: string) => {
    addToArray('sizes', size);
  };

  const addColor = (color: string) => {
    addToArray('colors', color);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Product description is required');
      return;
    }
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }
    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }
    if (formData.images.length === 0) {
      toast.error('At least one image is required');
      return;
    }

    try {
      // Generate slug from name
      const slug = formData.name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Auto-generate meta fields if not provided
      const meta_title = formData.meta_title || formData.name;
      const meta_description = formData.meta_description || formData.short_description || formData.description.substring(0, 155);

      const productData = {
        ...formData,
        slug,
        meta_title,
        meta_description,
        // Ensure dimensions is properly formatted
        dimensions: formData.dimensions && 
          formData.dimensions.length && 
          formData.dimensions.width && 
          formData.dimensions.height 
          ? formData.dimensions 
          : undefined
      };

      await addProduct(productData);
      setCurrentPage('admin');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const availableSubcategories = formData.category ? SUBCATEGORIES[formData.category as keyof typeof SUBCATEGORIES] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            onClick={() => setCurrentPage('admin')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
              <AnimatedEmoji emoji="✨" animation="pulse" size="large" />
              Add New Product
              <AnimatedEmoji emoji="🛍️" animation="bounce" size="large" />
            </h1>
            <p className="text-gray-600">Create a new product for your store</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => updateFormData('sku', e.target.value)}
                  placeholder="Product SKU"
                />
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => updateFormData('brand', e.target.value)}
                  placeholder="Brand name"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => updateFormData('short_description', e.target.value)}
                  placeholder="Brief product description"
                  className="h-20"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Detailed product description"
                  className="h-32"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Category & Classification */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold">Category & Classification</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select 
                  value={formData.subcategory} 
                  onValueChange={(value) => updateFormData('subcategory', value)}
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubcategories.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('tags', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-bold">Pricing</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="price">Current Price * ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="original_price">Original Price ($)</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.original_price || ''}
                  onChange={(e) => updateFormData('original_price', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>

              <div className="flex items-end">
                {formData.original_price && formData.original_price > formData.price && (
                  <div className="text-sm text-green-600 font-medium">
                    {Math.round(((formData.original_price - formData.price) / formData.original_price) * 100)}% off
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold">Product Images *</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={currentImageUrl}
                  onChange={(e) => setCurrentImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                />
                <Button type="button" onClick={addImage} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromArray('images', index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Variants (Sizes & Colors) */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="h-5 w-5 text-pink-600" />
              <h2 className="text-xl font-bold">Variants</h2>
            </div>
            
            <div className="space-y-6">
              {/* Sizes */}
              <div>
                <Label>Available Sizes</Label>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Object.entries(COMMON_SIZES).map(([type, sizes]) => (
                      <div key={type} className="space-y-1">
                        <span className="text-xs font-medium text-gray-500 capitalize">{type}</span>
                        <div className="flex flex-wrap gap-1">
                          {sizes.map((size) => (
                            <Button
                              key={size}
                              type="button"
                              variant={formData.sizes.includes(size) ? "default" : "outline"}
                              size="sm"
                              onClick={() => addSize(size)}
                              className="text-xs"
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizes.map((size, index) => (
                    <Badge key={index} variant="default" className="flex items-center gap-1">
                      {size}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('sizes', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <Label>Available Colors</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {COMMON_COLORS.map((color) => (
                    <Button
                      key={color}
                      type="button"
                      variant={formData.colors.includes(color) ? "default" : "outline"}
                      size="sm"
                      onClick={() => addColor(color)}
                      className="text-xs"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color, index) => (
                    <Badge key={index} variant="default" className="flex items-center gap-1">
                      {color}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('colors', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Inventory */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-bold">Inventory & Stock</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="stock_quantity">Stock Quantity</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e) => updateFormData('stock_quantity', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
                <Input
                  id="low_stock_threshold"
                  type="number"
                  min="0"
                  value={formData.low_stock_threshold}
                  onChange={(e) => updateFormData('low_stock_threshold', parseInt(e.target.value) || 10)}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => updateFormData('featured', checked)}
                />
                <Label htmlFor="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured Product
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => updateFormData('is_active', checked)}
                />
                <Label htmlFor="is_active">Active (visible in store)</Label>
              </div>
            </div>
          </Card>

          {/* Additional Details */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Ruler className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-bold">Additional Details</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Materials</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentMaterial}
                    onChange={(e) => setCurrentMaterial(e.target.value)}
                    placeholder="Add a material"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                  />
                  <Button type="button" onClick={addMaterial} variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.materials.map((material, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {material}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('materials', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="care_instructions">Care Instructions</Label>
                <Textarea
                  id="care_instructions"
                  value={formData.care_instructions}
                  onChange={(e) => updateFormData('care_instructions', e.target.value)}
                  placeholder="How to care for this product"
                  className="h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="weight_grams">Weight (grams)</Label>
                  <Input
                    id="weight_grams"
                    type="number"
                    min="0"
                    value={formData.weight_grams || ''}
                    onChange={(e) => updateFormData('weight_grams', e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>

                <div>
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.dimensions?.length || ''}
                    onChange={(e) => updateFormData('dimensions', {
                      ...formData.dimensions,
                      length: e.target.value ? parseFloat(e.target.value) : 0
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.dimensions?.width || ''}
                    onChange={(e) => updateFormData('dimensions', {
                      ...formData.dimensions,
                      width: e.target.value ? parseFloat(e.target.value) : 0
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.dimensions?.height || ''}
                    onChange={(e) => updateFormData('dimensions', {
                      ...formData.dimensions,
                      height: e.target.value ? parseFloat(e.target.value) : 0
                    })}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* SEO */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Search className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold">SEO & Meta</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => updateFormData('meta_title', e.target.value)}
                  placeholder="SEO title (auto-generated if empty)"
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => updateFormData('meta_description', e.target.value)}
                  placeholder="SEO description (auto-generated if empty)"
                  className="h-20"
                />
              </div>

              <div>
                <Label>SEO Keywords</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    placeholder="Add a keyword"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button type="button" onClick={addKeyword} variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.seo_keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('seo_keywords', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end space-x-4"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentPage('admin')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Product
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
