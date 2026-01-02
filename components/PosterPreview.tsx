import React from 'react';
import { Star, Leaf, CheckCircle2 } from 'lucide-react';
import { DishFormData, GeneratedContent, FontStyle } from '../types';

interface PosterPreviewProps {
  formData: DishFormData;
  content: GeneratedContent;
  posterRef: React.RefObject<HTMLDivElement | null>;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ formData, content, posterRef }) => {
  const isPortrait = formData.aspectRatio === '9:16';
  
  // Determine Image Source
  // Default fallback if no image is generated yet matching the dry fruit chaat vibe
  let displayImage = 'https://images.unsplash.com/photo-1599639668153-e5741b6555be?q=80&w=1000&auto=format&fit=crop';
  
  if (!formData.useAiImage && formData.uploadedImage) {
    displayImage = formData.uploadedImage;
  } else if (content.imageUrl) {
    displayImage = `data:image/png;base64,${content.imageUrl}`;
  }

  // Font Classes Mapper
  const getFontClasses = (style: FontStyle) => {
    switch (style) {
      case 'modern': return { title: 'font-modern font-black tracking-tighter', body: 'font-modern font-medium', italic: 'font-modern' };
      case 'minimal': return { title: 'font-sans font-bold tracking-tight', body: 'font-sans font-normal', italic: 'font-sans' };
      case 'elegant': return { title: 'font-script font-normal text-4xl', body: 'font-serif', italic: 'font-serif italic' };
      case 'classic': 
      default: return { title: 'font-serif font-bold', body: 'font-sans', italic: 'font-serif italic' };
    }
  };

  const fonts = getFontClasses(formData.fontStyle);

  return (
    <div className="flex-1 w-full flex flex-col items-center">
       <div className="mb-4 flex justify-between w-full max-w-lg px-4 text-stone-400 text-xs font-bold uppercase tracking-widest">
          <span>Live Preview</span>
          <span>{formData.aspectRatio} Mode</span>
       </div>

      {/* Poster Container */}
      <div className="relative w-full max-w-2xl bg-stone-200/50 rounded-3xl p-8 md:p-12 min-h-[700px] flex items-center justify-center border border-stone-300/50">
        
        <div 
          ref={posterRef}
          className={`relative overflow-hidden bg-white shadow-2xl transition-all duration-500 group flex flex-col
            ${isPortrait ? 'w-[360px] h-[640px]' : 'w-[500px] h-[580px]'}
          `}
        >
          {/* Main Image Layer (Top Section) */}
          <div className="relative w-full flex-1 overflow-hidden bg-stone-100">
             {content.isLoading && formData.useAiImage && (
               <div className="absolute inset-0 z-20 bg-stone-900/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                 <div className="w-12 h-12 border-4 border-white border-t-nutri-primary rounded-full animate-spin"></div>
               </div>
             )}
            <img 
              src={displayImage} 
              alt="Dish Render" 
              className={`w-full h-full object-cover transition-transform duration-[2s] ${content.isLoading ? 'scale-110' : 'scale-100'}`}
              crossOrigin="anonymous" 
            />
            
            {/* Top Right Verification Badge */}
            {formData.discount && (
               <div className="absolute top-4 right-4 z-10 bg-nutri-accent/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full shadow-lg border border-white/20 flex items-center gap-1">
                 <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                 <span className={`text-[10px] font-bold tracking-wider uppercase ${fonts.body}`}>{formData.discount}</span>
               </div>
             )}
          </div>

          {/* White Content Card (Bottom Section) */}
          <div className="bg-white p-6 pb-2 relative z-10 flex flex-col">
            
            <div className="flex justify-between items-start mb-3">
               <h2 className={`${fonts.title} text-2xl text-nutri-dark leading-none max-w-[70%]`}>
                  {formData.dishName.split(' with ')[0] || 'Dish Name'}
                  <span className="block text-sm opacity-60 font-normal mt-1 tracking-normal font-sans text-stone-500">
                    {formData.dishName.includes('with') ? 'with ' + formData.dishName.split('with')[1] : ''}
                  </span>
               </h2>
               <div className="text-right">
                 <span className="text-xl font-bold text-nutri-primary block tracking-tight">{formData.price || '$0.00'}</span>
                 <div className="flex text-amber-400 justify-end mt-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                 </div>
               </div>
            </div>

            <p className={`text-stone-500 text-xs leading-relaxed mb-4 ${fonts.body} line-clamp-3 text-justify`}>
              "{formData.description || (content.isLoading ? 'Crafting description...' : 'Description will appear here.')}"
            </p>

            <div className="border-t border-dashed border-stone-200 pt-3 mb-2">
               <div className="flex flex-wrap gap-2 text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  {formData.healthFocus && (
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-stone-400 rounded-full"></span> 
                      {formData.healthFocus.split(',')[0]}
                    </span>
                  )}
                  {formData.ingredients && (
                    <span className="flex items-center gap-1">
                       <span className="w-1 h-1 bg-stone-400 rounded-full"></span> 
                       High Fiber
                    </span>
                  )}
               </div>
            </div>

          </div>

          {/* Green Footer Bar */}
          <div className="bg-nutri-dark py-3 px-6 text-center mt-auto border-t-4 border-nutri-primary">
              <div className="flex items-center justify-center gap-2">
                 <Leaf size={12} className="text-nutri-primary" fill="currentColor" />
                 <span className="text-nutri-primary text-[10px] font-bold tracking-[0.3em] uppercase">NutriGen Wellness</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};