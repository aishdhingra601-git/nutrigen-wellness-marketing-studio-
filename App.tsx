import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PosterPreview } from './components/PosterPreview';
import { DishFormData, GeneratedContent } from './types';
import { generateDishContent } from './services/geminiService';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const posterRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<DishFormData>({
    dishName: 'Dry Fruit Chaat with Makhanas and ayurvedic twist',
    heroIngredient: 'Makhana (Fox Nuts)',
    ingredients: 'Walnuts, Peanuts, Ayurvedic Spices & Seasoning, Fresh Herbs',
    price: '$10.00',
    healthFocus: 'Improved Digestion, Brain Health',
    aspectRatio: '1:1',
    imageEnhancements: 'Warm earthy tones, rustic wooden bowl',
    discount: 'VERIFIED',
    description: 'Experience true nourishment with this crunchy, spice-infused masterpiece. The roasted makhanas and premium nuts offer a satisfying texture, while ancient Ayurvedic seasonings elevate every bite. It is a guilt-free energy powerhouse.',
    useAiImage: true,
    uploadedImage: null,
    brandLogo: null,
    fontStyle: 'classic'
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({
    imageUrl: null,
    isLoading: false,
  });

  const handleGenerate = async () => {
    if (!formData.dishName) return;

    setGeneratedContent(prev => ({ ...prev, isLoading: true }));
    // Force AI mode if generating
    setFormData(prev => ({ ...prev, useAiImage: true }));

    try {
      const { description, imageBase64 } = await generateDishContent(
        formData.dishName,
        formData.heroIngredient,
        formData.ingredients,
        formData.healthFocus,
        formData.aspectRatio,
        formData.imageEnhancements
      );

      setGeneratedContent({
        imageUrl: imageBase64,
        isLoading: false,
      });

      // Update the editable description field
      setFormData(prev => ({ ...prev, description }));

    } catch (error) {
      console.error(error);
      setGeneratedContent(prev => ({ ...prev, isLoading: false }));
      alert('Failed to generate content. Check console for details.');
    }
  };

  const handleDownload = async () => {
    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, {
          useCORS: true,
          scale: 3, // Very High resolution for print quality
          backgroundColor: null,
        });
        
        const link = document.createElement('a');
        link.download = `nutrigen-${formData.dishName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error("Download failed:", err);
        alert("Failed to download image. Try again.");
      }
    }
  };

  const handleShare = async () => {
    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, {
           useCORS: true,
           scale: 2 
        });
        
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          const file = new File([blob], 'nutrigen-poster.png', { type: 'image/png' });
          
          if (navigator.share) {
            try {
              await navigator.share({
                title: 'NutriGen Culinary Design',
                text: `Check out this design for: ${formData.dishName}`,
                files: [file],
              });
            } catch (error) {
              console.log('Error sharing:', error);
            }
          } else {
            alert('Web Share API not supported in this browser. Please download instead.');
          }
        }, 'image/png');
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-nutri-primary/20 selection:text-nutri-primary">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          <InputForm 
            formData={formData} 
            setFormData={setFormData} 
            onGenerate={handleGenerate}
            onDownload={handleDownload}
            onShare={handleShare}
            isGenerating={generatedContent.isLoading}
          />
          
          <PosterPreview 
            formData={formData}
            content={generatedContent}
            posterRef={posterRef}
          />

        </div>
      </main>
    </div>
  );
};

export default App;