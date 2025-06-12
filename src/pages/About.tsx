
import React from 'react';
import { ChefHat, Globe, Download, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6">
            About RecipeWorld
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your gateway to discovering delicious recipes from around the world, 
            with instant translation and easy sharing capabilities.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            At RecipeWorld, we believe that food transcends borders and languages. Our mission is to 
            make the world's most delicious recipes accessible to everyone, regardless of their native 
            language. We leverage cutting-edge translation technology to break down language barriers 
            and bring authentic flavors to your kitchen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Recipes</h3>
            <p className="text-gray-600">Discover thousands of authentic recipes from TheMealDB</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Language</h3>
            <p className="text-gray-600">Instant translation to 14+ languages including Hindi, Tamil, French</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Download</h3>
            <p className="text-gray-600">Download recipes as beautifully formatted PDFs</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Made with Love</h3>
            <p className="text-gray-600">Carefully curated content for food enthusiasts worldwide</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            RecipeWorld was born from a simple idea: everyone should be able to enjoy great food, 
            regardless of language barriers. Our team of food enthusiasts and technology experts 
            came together to create a platform that celebrates culinary diversity while making 
            recipes accessible to all.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a seasoned chef or just starting your culinary journey, RecipeWorld 
            is here to inspire and guide you. Join our community of food lovers and explore 
            the incredible world of flavors that await you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
