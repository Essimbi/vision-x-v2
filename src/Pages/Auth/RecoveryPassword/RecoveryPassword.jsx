import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecoveryPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fonction de validation d'email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecovery = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation de l'email
    if (!validateEmail(email)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    // Simule l'envoi d'un email de réinitialisation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
      // Optionnel : Rediriger vers la page de login après un délai
      setTimeout(() => {
        navigate('/');
      }, 3000);
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

        {/* Recovery Card */}
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow">
          <div className="mb-6 text-center">
            <div className="text-sm text-gray-500">Récupération de mot de passe</div>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">Réinitialiser</h1>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleRecovery} className="space-y-4">
            <div>
              <input
                type="email"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                  error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
              )}
              {success && (
                <p className="mt-1 text-sm text-green-500">
                  Un lien de réinitialisation a été envoyé à votre adresse email.
                </p>
              )}
            </div>

            {/* Back to Login Link */}
            <div className="flex items-center justify-between">
              <a href="/" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                Retour à la connexion
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading || success}
            >
              {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;