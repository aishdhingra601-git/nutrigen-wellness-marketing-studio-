import React, { useRef } from 'react';
import { Sparkles, Download, Info, Share2, Image as ImageIcon, Upload, Type, PenTool, Star } from 'lucide-react';
import { DishFormData, FontStyle } from '../types';

interface InputFormProps {
  formData: DishFormData;
  setFormData: React.Dispatch<React.SetStateAction<DishFormData>>;
  onGenerate: () => void;
  onDownload: () => void;
  onShare: () => void;
  isGenerating: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ 
  formData, 
  setFormData, 
  onGenerate, 
  onDownload,
  onShare,
  isGenerating 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, uploadedImage: reader.result as string, useAiImage: false }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, brandLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fontOptions: { id: FontStyle; label: string; fontClass: string }[] = [
    { id: 'classic', label: 'Classic', fontClass: 'font-serif' },
    { id: 'modern', label: 'Modern', fontClass: 'font-modern' },
    { id: 'minimal', label: 'Clean', fontClass: 'font-sans' },
    { id: 'elegant', label: 'Script', fontClass: 'font-script' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full lg:w-[420px] shrink-0">
      <div className="bg-white p-6 rounded-3xl shadow-card border border-white/50 relative overflow-hidden">
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-nutri-dark">Design Studio</h2>
           {/* Aspect Ratio Toggle Mini */}
           <div className="flex bg-stone-100 rounded-lg p-1">
              <button 
                onClick={() => setFormData(prev => ({ ...prev, aspectRatio: '1:1' }))}
                className={`p-1.5 rounded-md transition-all ${formData.aspectRatio === '1:1' ? 'bg-white shadow text-nutri-dark' : 'text-stone-400'}`}
                title="Square"
              >
                <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
              </button>
              <button 
                onClick={() => setFormData(prev => ({ ...prev, aspectRatio: '9:16' }))}
                className={`p-1.5 rounded-md transition-all ${formData.aspectRatio === '9:16' ? 'bg-white shadow text-nutri-dark' : 'text-stone-400'}`}
                title="Portrait"
              >
                <div className="w-3 h-4 border-2 border-current rounded-sm"></div>
              </button>
           </div>
        </div>

        {/* Image Source Tabs */}
        <div className="flex p-1 bg-stone-100 rounded-xl mb-6">
          <button 
            onClick={() => setFormData(prev => ({ ...prev, useAiImage: true }))}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${formData.useAiImage ? 'bg-white shadow-sm text-nutri-dark' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <Sparkles size={14} /> AI Generate
          </button>
          <button 
            onClick={() => setFormData(prev => ({ ...prev, useAiImage: false }))}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${!formData.useAiImage ? 'bg-white shadow-sm text-nutri-dark' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <Upload size={14} /> Upload Real
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Main Inputs */}
          <div className="space-y-3">
             <input
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              placeholder="Dish Name"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-nutri-primary/20 focus:border-nutri-primary"
            />

            {/* Hero Ingredient Input */}
            <div className="relative">
              <input
                type="text"
                name="heroIngredient"
                value={formData.heroIngredient}
                onChange={handleChange}
                placeholder="Hero Ingredient (e.g. Saffron)"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-nutri-primary/20 focus:border-nutri-primary"
              />
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            </div>
            
             <div className="flex gap-3">
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-1/2 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-nutri-primary/20 focus:border-nutri-primary"
                />
                 <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Tag (e.g. -20%)"
                  className="w-1/2 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-nutri-primary/20 focus:border-nutri-primary"
                />
             </div>
          </div>

          {/* Conditional Input Section */}
          {formData.useAiImage ? (
             <div className="bg-nutri-primary/5 p-4 rounded-xl space-y-3 border border-nutri-primary/10">
                <p className="text-[10px] font-bold text-nutri-primary uppercase tracking-wider">AI Configuration</p>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Other ingredients..."
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium resize-none focus:outline-none focus:border-nutri-primary"
                />
                <input
                  type="text"
                  name="imageEnhancements"
                  value={formData.imageEnhancements}
                  onChange={handleChange}
                  placeholder="Style (e.g. Dark moody...)"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:border-nutri-primary"
                />
             </div>
          ) : (
            <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-stone-50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
               <ImageIcon className="text-stone-400" size={24} />
               <p className="text-xs text-stone-500 font-medium">Click to upload photo</p>
               <input 
                 ref={fileInputRef}
                 type="file" 
                 accept="image/*" 
                 onChange={handleImageUpload} 
                 className="hidden" 
               />
               {formData.uploadedImage && <p className="text-[10px] text-nutri-primary font-bold">Image Loaded ✓</p>}
            </div>
          )}

          <div className="border-t border-stone-100 my-2"></div>

          {/* Branding Section */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Upload size={10} /> Brand Logo
            </label>
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => logoInputRef.current?.click()}
                 className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-bold text-stone-600 transition-colors"
               >
                 Upload Logo
               </button>
               {formData.brandLogo ? (
                 <span className="text-xs text-green-600 font-bold flex items-center gap-1">✓ Attached <button onClick={() => setFormData(p => ({...p, brandLogo: null}))} className="text-red-400 ml-1">×</button></span>
               ) : (
                 <span className="text-xs text-stone-400 italic">No logo selected</span>
               )}
               <input 
                 ref={logoInputRef}
                 type="file" 
                 accept="image/*" 
                 onChange={handleLogoUpload} 
                 className="hidden" 
               />
            </div>
          </div>

          {/* Typography Section */}
          <div>
             <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
               <Type size={10} /> Typography Style
             </label>
             <div className="grid grid-cols-4 gap-2">
                {fontOptions.map(font => (
                  <button
                    key={font.id}
                    onClick={() => setFormData(prev => ({ ...prev, fontStyle: font.id }))}
                    className={`py-2 px-1 rounded-lg text-[10px] border transition-all ${
                      formData.fontStyle === font.id 
                        ? 'bg-nutri-dark text-white border-nutri-dark' 
                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className={font.fontClass}>{font.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* Edit Description */}
          <div>
             <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
               <PenTool size={10} /> Edit Description
             </label>
             <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-600 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-nutri-primary"
             />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-3 sticky bottom-0 bg-white pb-2">
            {formData.useAiImage && (
              <button
                onClick={onGenerate}
                disabled={isGenerating}
                className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm tracking-wide transition-all transform active:scale-[0.98] shadow-lg shadow-nutri-primary/25 flex items-center justify-center gap-2 ${
                  isGenerating 
                    ? 'bg-stone-400 cursor-not-allowed' 
                    : 'bg-nutri-primary hover:bg-green-800'
                }`}
              >
                <Sparkles size={16} />
                {isGenerating ? 'Designing...' : 'Generate New Design'}
              </button>
            )}
            
            <div className="flex gap-3">
               <button 
                onClick={onDownload}
                className="flex-1 py-3 px-4 rounded-xl bg-nutri-dark text-white font-bold text-xs hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={16} />
                Download Poster
              </button>
               <button 
                onClick={onShare}
                className="flex-none w-12 py-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all flex items-center justify-center border border-stone-200"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};