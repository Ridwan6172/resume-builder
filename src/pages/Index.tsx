
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Briefcase, User, Award } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-gray-900 mb-6">
                Create a Professional Resume <span className="text-blue-600">in Minutes</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Stand out with a professionally designed resume. Choose from multiple templates and customize your resume to land your dream job.
              </p>
              <Link to="/builder">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  Create My Resume
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-xl text-gray-600">Simple steps to create your perfect resume</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <User className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-4">Enter Your Details</h3>
                <p className="text-gray-600">Fill in your information with our easy-to-use form wizard. Include your experience, skills, education and more.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-4">Choose a Template</h3>
                <p className="text-gray-600">Select from our collection of professionally designed templates that match your personality and career goals.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-4">Download & Apply</h3>
                <p className="text-gray-600">Preview your resume, make final adjustments, and download the file. You're now ready to impress employers!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900">Professional Resume Templates</h2>
              <p className="mt-4 text-xl text-gray-600">Choose from our collection of beautifully designed templates</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Template previews will be added here */}
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 font-montserrat">Template Preview {i + 1}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-montserrat font-medium text-lg">Template {i + 1}</h3>
                    <p className="text-gray-500 text-sm mt-2">Professional and modern design</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/builder">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900">Why People Love Us</h2>
              <p className="mt-4 text-xl text-gray-600">Hear from our satisfied users</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial cards */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <h4 className="font-montserrat font-semibold">Alex Johnson</h4>
                    <p className="text-gray-500 text-sm">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-600">"I landed my dream job thanks to this resume builder. The templates are professional and the form makes it so easy to input all my information."</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <h4 className="font-montserrat font-semibold">Sarah Miller</h4>
                    <p className="text-gray-500 text-sm">Marketing Specialist</p>
                  </div>
                </div>
                <p className="text-gray-600">"The resume templates are sleek and modern. I received compliments from recruiters specifically about my resume design!"</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <h4 className="font-montserrat font-semibold">Michael Chen</h4>
                    <p className="text-gray-500 text-sm">Recent Graduate</p>
                  </div>
                </div>
                <p className="text-gray-600">"As a recent graduate with limited experience, this tool helped me create a professional resume that highlights my skills and education. Highly recommend!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-montserrat font-bold text-white mb-6">
                Ready to Create Your Resume?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Join thousands of job seekers who have successfully created professional resumes.
              </p>
              <Link to="/builder">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 border-2">
                  Create My Resume Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
