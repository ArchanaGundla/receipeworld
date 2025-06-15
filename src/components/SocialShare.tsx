
import React from 'react';
import { Share2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Recipe } from '../data/recipes';
import { toast } from 'sonner';

interface SocialShareProps {
  recipe: Recipe;
}

const SocialShare: React.FC<SocialShareProps> = ({ recipe }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Check out this amazing ${recipe.title} recipe from RecipeWorld!`);
  const shareHashtags = encodeURIComponent('RecipeWorld,Cooking,Food,Recipe');

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=${shareHashtags}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

  const handleShare = (platform: string, url: string) => {
    console.log(`Sharing recipe "${recipe.title}" on ${platform}`);
    window.open(url, '_blank', 'width=600,height=400');
    toast.success(`Opened ${platform} share dialog`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Recipe link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this amazing ${recipe.title} recipe!`,
          url: window.location.href,
        });
        toast.success('Recipe shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Share Recipe:</span>
      </div>
      
      {/* Social Media Buttons */}
      <div className="flex space-x-2">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform.name, platform.url)}
            className={`flex items-center space-x-2 ${platform.color} text-white px-3 py-2 rounded-lg transition-colors text-sm`}
            title={`Share on ${platform.name}`}
          >
            <platform.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        title="Copy Link"
      >
        Copy Link
      </button>

      {/* Native Share Button (for mobile devices) */}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          title="Share"
        >
          Share
        </button>
      )}
    </div>
  );
};

export default SocialShare;
