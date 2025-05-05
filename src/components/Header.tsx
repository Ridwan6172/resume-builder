
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-montserrat font-bold text-gray-900">ResumeBuilder</span>
            </Link>
          </div>
          <nav className="flex space-x-4">
            {location.pathname !== "/" && (
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
            )}
            {location.pathname !== "/builder" && (
              <Link to="/builder">
                <Button variant={location.pathname === "/" ? "default" : "ghost"}>
                  Create Resume
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
