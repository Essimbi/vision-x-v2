import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le loader
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true); // Active le loader

    // Simule un appel API avec un délai
    setTimeout(() => {
      setLoading(false); // Désactive le loader
      navigate('/dashboard'); // Redirige vers le tableau de bord
    }, 2000); // 2 secondes de délai
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                placeholder="Adresse e-mail"
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                placeholder="Mot de passe"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600"
              disabled={loading} // Désactive le bouton pendant le chargement
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