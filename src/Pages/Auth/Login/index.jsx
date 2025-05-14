import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Fonction de validation d'email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction de validation de mot de passe
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    setErrors({ email: '', password: '' });
    
    let hasError = false;
    
    // Validation de l'email
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Veuillez entrer un email valide' }));
      hasError = true;
    }

    // Validation du mot de passe
    if (!validatePassword(password)) {
      setErrors(prev => ({ 
        ...prev, 
        password: 'Le mot de passe doit contenir au moins 8 caractères, incluant des majuscules, minuscules et chiffres' 
      }));
      hasError = true;
    }

    // Si aucune erreur, procéder à la connexion
    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex items-center">
          <div className="mr-2 flex h-10 w-32 items-center justify-center rounded bg-white">
            <img src="/logo.png" alt="Logo" className="h-20 w-32 rounded-full" />
          </div>
          <span className="text-3xl font-bold text-blue-700">VisionX</span>
        </div>

        {/* Login Card */}
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow">
          <div className="mb-6 text-center">
            <div className="text-sm text-gray-500">Veuillez entrer vos informations de connexion</div>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">Bienvenue</h1>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <a href="/forget-password" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Connexion'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;