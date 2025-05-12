import React, { useState, useRef } from 'react';
import { Upload, FileUp, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const FileUploadAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState(null); // null, 'success', 'error'
  const fileInputRef = useRef(null);

  // Gérer le glisser-déposer
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setAnalysisStatus(null);
    }
  };

  // Gérer la sélection de fichier
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setAnalysisStatus(null);
    }
  };

  // Ouvrir la boîte de dialogue de sélection de fichier
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Analyser le fichier
  const handleAnalyze = () => {
    setIsLoading(true);
    
    // Simuler un appel API
    setTimeout(() => {
      // 90% chance de succès, 10% d'erreur pour la démo
      const isSuccess = Math.random() > 0.1;
      
      setIsLoading(false);
      setAnalysisStatus(isSuccess ? 'success' : 'error');
    }, 2500);
  };

  // Retirer le fichier
  const handleRemoveFile = () => {
    setFile(null);
    setAnalysisStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-10">
      {/* Zone de téléchargement */}
      <div 
        className={`w-full p-6 mb-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-blue-300 hover:border-blue-500 bg-white'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!file ? handleButtonClick : undefined}
        style={{ minHeight: '200px' }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {!file ? (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-blue-500" />
            <p className="mt-2 text-sm font-medium text-blue-600">
              Glissez-déposez un fichier ici
            </p>
            <p className="text-xs text-gray-500">OU</p>
            <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Parcourir les fichiers
            </button>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <FileUp className="h-6 w-6 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button 
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <span className="text-sm">×</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bouton d'analyse */}
      <div className="w-full">
        <button
          onClick={handleAnalyze}
          disabled={!file || isLoading}
          className={`w-full py-3 rounded-lg flex items-center justify-center transition-all ${
            !file 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            'Analyser le document'
          )}
        </button>
      </div>

      {/* Message de statut */}
      {analysisStatus && (
        <div className={`mt-4 p-4 w-full rounded-lg ${
          analysisStatus === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex items-center">
            {analysisStatus === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            <p className="text-sm font-medium">
              {analysisStatus === 'success' 
                ? 'Analyse terminée avec succès !' 
                : 'Une erreur est survenue lors de l\'analyse.'}
            </p>
          </div>
          {analysisStatus === 'error' && (
            <p className="mt-1 text-xs ml-7">
              Veuillez vérifier votre fichier et réessayer.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadAnalyzer;